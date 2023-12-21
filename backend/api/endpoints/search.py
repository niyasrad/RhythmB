from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.orm import Session
from core.utils.search import es

from core.schemas.search import SearchQuery
from core.utils.dependencies import get_db

from core.utils.middlewares import authenticate_common


router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.post(
    "/any", dependencies=[Depends(authenticate_common)], status_code=status.HTTP_200_OK
)
async def search(search_query: SearchQuery):
    """
    Searches for a query in the database.
    """

    query = search_query.query

    search_query = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": [
                    "title",
                    "name",
                    "album_title",
                    "artist_name",
                    "genre",
                    "tags",
                    "username",
                ],
                "fuzziness": 2,
            }
        },
        "min_score": 0.01,
    }

    try:

        results = es.search(
            index=["artists", "songs", "albums", "users"], body=search_query
        )
        hits = results.get("hits", {}).get("hits", [])

        return {"message": "Search Results", "data": hits}
    except Exception as e:
        raise e


@router.get(
    "/songs/{attribute}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def filter_songs(attribute: str, query: str, db: Session = Depends(get_db)):
    """
    Searches for a query in the songs index.
    """

    search_query = {
        "query": {"fuzzy": {attribute: {"value": query, "fuzziness": 2}}},
    }

    try:

        results = es.search(index=["songs"], body=search_query)
        hits = results.get("hits", {}).get("hits", [])

        return {"message": "Search Results", "data": hits}
    except Exception as e:
        raise e


@router.post(
    "/recommendation",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def recommendation(request: Request):
    """
    Returns artists, songs recommendations by MLT
    """

    user = request.state.user

    like_documents = []

    ratings = user.ratings
    if len(ratings) > 2:
        ratings.sort(key=lambda x: x.rating, reverse=True)
    ratings = ratings[:3]

    for rating in ratings:
        like_documents.append({"_index": "songs", "_id": rating.song_id})

    for artist_id in user.interests:
        like_documents.append({"_index": "artists", "_id": artist_id})

    search_query = {
        "query": {
            "more_like_this": {
                "fields": ["title", "tags"],
                "like": like_documents,
                "min_term_freq": 1,
                "max_query_terms": 25,
            }
        },
    }

    try:

        song_results = es.search(index=["songs"], body=search_query)
        song_hits = song_results.get("hits", {}).get("hits", [])

        artist_results = es.search(index=["artists"], body=search_query, size=2)
        artist_hits = artist_results.get("hits", {}).get("hits", [])

        return {
            "message": "Recommendation Results",
            "data": {"songs": song_hits, "artists": artist_hits},
        }
    except Exception as e:
        raise e


@router.get(
    "/related/albums/{id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def related_albums(id: str):
    """
    Returns related albums by MLT
    """

    search_query = {
        "query": {
            "more_like_this": {
                "fields": ["title", "artist_name", "genre"],
                "like": [{"_index": "albums", "_id": id}],
                "min_term_freq": 1,
                "max_query_terms": 20,
            }
        },
    }

    try:

        results = es.search(index=["albums"], body=search_query)
        hits = results.get("hits", {}).get("hits", [])

        return {"message": "Related Albums", "data": hits}
    except Exception as e:
        raise e
