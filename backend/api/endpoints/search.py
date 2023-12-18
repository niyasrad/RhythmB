from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.orm import Session
from core.utils.search import es
from core.utils.dependencies import get_db

from core.utils.middlewares import authenticate_common


router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.get(
    "/any", dependencies=[Depends(authenticate_common)], status_code=status.HTTP_200_OK
)
async def search(query: str, db: Session = Depends(get_db)):
    """
    Searches for a query in the database.
    """

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


@router.get(
    "/recommendation",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def recommendation(request: Request):
    """
    Returns artists, songs recommendations by MLT
    """

    user = request.state.user

    search_query = {
        "query": {
            "more_like_this": {
                "fields": ["genre"],
                "like": user.interests,
                "min_term_freq": 1,
                "max_query_terms": 20,
            }
        },
    }

    try:

        song_results = es.search(index=["songs"], body=search_query)
        song_hits = song_results.get("hits", {}).get("hits", [])

        artist_results = es.search(index=["artists"], body=search_query)
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
