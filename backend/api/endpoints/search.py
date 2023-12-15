from fastapi import APIRouter, Depends, status
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
