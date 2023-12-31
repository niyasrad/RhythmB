from fastapi import APIRouter, Depends, status, Request

from sqlalchemy.orm import Session
from core.utils.search import es

from core.models.user import UserRole
from core.models.song import Song
from core.models.rating import Rating
from core.schemas.rating import Rating as RatingSchema

from core.utils.dependencies import get_db
from core.utils.errors import (
    handle_exception,
    not_found_error,
    conflict_error,
)
from core.utils.middlewares import authenticate_common

router = APIRouter(
    prefix="/rating",
    tags=["Rating"],
)


@router.post(
    "/create",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def create_rating(
    request: Request, rating: RatingSchema, db: Session = Depends(get_db)
):
    """
    Creates a new rating.
    """

    user = request.state.user

    find_rating = (
        db.query(Rating)
        .filter(Rating.user_id == rating.user_id)
        .filter(Rating.song_id == rating.song_id)
        .first()
    )

    if find_rating:
        raise conflict_error("rating")

    new_rating = Rating(rating=rating.rating, user_id=user.id, song_id=rating.song_id)
    rated_song = db.query(Song).filter(Song.id == new_rating.song_id).first()

    if not rated_song:
        raise not_found_error("Song")

    try:
        db.add(new_rating)
        db.commit()
        db.refresh(new_rating)

        rating_document = {
            "id": new_rating.id,
            "rating": new_rating.rating,
            "user_id": new_rating.user_id,
            "song_id": new_rating.song_id,
            "artist_id": rated_song.artist_id,
            "album_id": rated_song.album_id,
        }

        es.index(index="ratings", id=new_rating.id, body=rating_document)

        return {"message": "Rating Created Successfully!", "data": new_rating}
    except Exception as e:
        raise handle_exception(e)


@router.put(
    "/update",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def update_rating(
    request: Request,
    rating: RatingSchema,
    db: Session = Depends(get_db),
):
    """
    Updates the rating with the given id.
    """

    user = request.state.user

    find_rating = (
        db.query(Rating)
        .filter(Rating.user_id == user.id)
        .filter(Rating.song_id == rating.song_id)
        .first()
    )

    if not find_rating:
        raise not_found_error("Rating")

    if find_rating.user_id != user.id and user.role != UserRole.ADMIN:
        raise not_found_error("Rating")

    find_rating.rating = rating.rating
    find_rating.song_id = rating.song_id

    try:
        db.commit()
        db.refresh(find_rating)

        rating_document = {
            "rating": find_rating.rating,
            "song_id": find_rating.song_id,
        }

        es.update(index="ratings", id=find_rating.id, body={"doc": rating_document})

        return {"message": "Rating Updated Successfully!", "data": find_rating}
    except Exception as e:
        raise handle_exception(e)


@router.delete(
    "/delete/{song_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def delete_rating(request: Request, song_id: str, db: Session = Depends(get_db)):
    """
    Deletes the rating with the given id.
    """

    user = request.state.user

    find_rating = (
        db.query(Rating)
        .filter(Rating.user_id == user.id)
        .filter(Rating.song_id == song_id)
        .first()
    )

    if not find_rating:
        raise not_found_error("Rating")

    if find_rating.user_id != user.id and user.role != UserRole.ADMIN:
        raise not_found_error("Rating")

    try:
        db.delete(find_rating)
        db.commit()

        es.delete(index="ratings", id=find_rating.id)

        return {"message": "Rating Deleted Successfully!"}
    except Exception as e:
        raise handle_exception(e)
