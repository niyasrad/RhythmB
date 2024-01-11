import json
from uuid import UUID
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy.orm.state import InstanceState

from core.utils.database import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return str(obj)
        elif isinstance(obj.__class__, DeclarativeMeta):
            # Exclude SQLAlchemy internal state
            fields = {key: value for key, value in obj.__dict__.items() if not key.startswith("_")}
            return fields
        elif isinstance(obj, InstanceState):
            # Exclude SQLAlchemy InstanceState
            return None
        return super().default(obj)