from dotenv import load_dotenv
from os import getenv
from elasticsearch import Elasticsearch

load_dotenv()

es_username = getenv("ES_USERNAME")
es_password = getenv("ES_PASSWORD")
es_url = getenv("ES_URL")

es = Elasticsearch(es_url, basic_auth=(es_username, es_password), verify_certs=False)


def initialize_indexes():

    artist_mapping = {
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "name": {"type": "text"},
                "genre": {"type": "keyword"},
                "user_id": {"type": "keyword"},
            }
        }
    }

    album_mapping = {
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "title": {"type": "text"},
                "artist_id": {"type": "keyword"},
                "arist_name": {"type": "text"},
            }
        }
    }

    song_mapping = {
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "title": {"type": "text"},
                "artist_id": {"type": "keyword"},
                "album_id": {"type": "keyword"},
                "artist_name": {"type": "text"},
                "album_title": {"type": "text"},
                "genre": {"type": "keyword"},
                "length": {"type": "integer"},
            }
        }
    }

    user_mapping = {
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "username": {"type": "text"},
                "email": {"type": "keyword"},
                "hashed_password": {"type": "keyword"},
                "role": {"type": "keyword"},
                "interests": {"type": "keyword"},
            }
        }
    }

    playlist_mapping = {
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "title": {"type": "text"},
                "user_id": {"type": "keyword"},
                "username": {"type": "text"},
                "songs": {"type": "nested"},
            }
        }
    }

    rating_mapping = {
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "user_id": {"type": "keyword"},
                "song_id": {"type": "keyword"},
                "artist_id": {"type": "keyword"},
                "album_id": {"type": "keyword"},
                "rating": {"type": "integer"},
            }
        }
    }

    create_index("artists", artist_mapping)
    create_index("albums", album_mapping)
    create_index("users", user_mapping)
    create_index("ratings", rating_mapping)
    create_index("songs", song_mapping)
    create_index("playlists", playlist_mapping)


def create_index(index_name, mapping):
    es.indices.create(index=index_name, body=mapping, ignore=400)
