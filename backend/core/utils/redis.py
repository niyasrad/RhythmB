from dotenv import load_dotenv
from os import getenv
import redis

class RedisManager:
    def __init__(self, redis_host: str, redis_port: int, redis_password: str):
        self.redis_host = redis_host
        self.redis_port = redis_port
        self.redis_password = redis_password
        self.redis = None

    async def connect(self):
        self.redis = redis.StrictRedis(host=self.redis_host, port=self.redis_port, password=self.redis_password, decode_responses=True)
        self.redis.ping()

    async def get_redis_instance(self):
        self.redis.ping()
        return self.redis

    def close(self):
        if self.redis:
            self.redis.close()

redis_manager = RedisManager(redis_host=getenv("REDIS_HOST"), redis_port=int(getenv("REDIS_PORT")), redis_password=getenv("REDIS_PWD"))
