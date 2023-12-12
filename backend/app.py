from fastapi import FastAPI
from api.endpoints import user, artist, song, playlist, album, rating
from core.utils.database import Base, engine
from core.utils.middlewares import init_middlewares

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RhythmB",
    description="Backend Server for RhythmB",
    version="0.0.1",
    docs_url="/docs",
    redoc_url="/redocs",
    contact={"name": "Niyas Hameed", "url": "https://niyas-hameed.vercel.app/"},
)

init_middlewares(app)

app.include_router(user.router)
app.include_router(artist.router)
app.include_router(album.router)
app.include_router(song.router)
app.include_router(playlist.router)
app.include_router(rating.router)


@app.get("/", status_code=200, tags=["Base"])
def get_status():
    """
    Returns the status of the server.
    """
    return {"status": "Server is up and running!"}
