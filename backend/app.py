from fastapi import FastAPI

app = FastAPI()

@app.get("/", status_code=200)
def get_status() -> dict:

    """
    Returns the status of the server.
    """

    return {"status": "Server is up and running!"}  