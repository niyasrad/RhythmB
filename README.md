## Welcome to the RhythmB Docs!

![Alt text](frontend/src/assets/logo/rhythmb.svg)

RhythmB is a music streaming service that allows users to listen to their favorite songs and discover new music. It is built using Python, FastAPI, PostgreSQL, Elasticsearch, and Kibana for the backend and React and Typescript for the frontend.

## Contents

- [Tech Stack, Tools and Libraries](#tech-stack-tools-and-libraries)
- [DB, Index and Design](#db-index-and-design)
- [API Documentation](#api-documentation)
- [Setup & Environment](#setup)
- [Backing up PostgreSQL](#backing-up-postgresql)
- [Elasticsearch & Kibana](#elasticsearch)
- [Backing up Elasticsearch](#backing-up-elasticsearch)
- [Screenshots](#screenshots)
- [About Dataset](#more-about-the-dataset)
- [K8s Deployment & Services](#k8s-deployment--services)
- [Redis Caching](#redis-caching)
- [Helm Chart for K8s](#helm-chart-for-k8s)


## Tech Stack, Tools and Libraries

### Backend

- [Python](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Elasticsearch](https://www.elastic.co/)
- [Kibana](https://www.elastic.co/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [Pydantic](https://pydantic-docs.helpmanual.io/)
- [Pre-Commit](https://pre-commit.com/)
- [Black](https://black.readthedocs.io/en/stable/)
- [Flake8](https://flake8.pycqa.org/en/latest/)
- [Last FM API](https://www.last.fm/api)

### Frontend

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

### Others

- [Visual Studio Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [Git](https://git-scm.com/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

## DB, Index and Design

### Database

We're using PostgreSQL for the database.

### ORM - SQLAlchemy

We're using SQLAlchemy as the ORM, and we're using the declarative approach. The relationships are defined using the `relationship` function, and are used to create the foreign key constraints. This allows for cascading deletes and updates.


![Alt text](<./docs_assets/db_entities.jpeg>)

### Note

- If an `Artist` is deleted, all the `Albums` and `Songs` associated with the `Artist` are deleted.
- If an `Album` is deleted, all the `Songs` associated with the `Album` are deleted.
- If a `Song` is deleted, all the `Ratings` associated with the `Song` are deleted, and the `Song` is removed from all the `Playlists` it is associated with.

### Song Schema (Example)

```python
class Song(Base):
    __tablename__ = "songs"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String, index=True)
    artist_id = Column(
        UUID(as_uuid=True), ForeignKey("artists.id", ondelete="CASCADE"), index=True
    )
    album_id = Column(
        UUID(as_uuid=True), ForeignKey("albums.id", ondelete="CASCADE"), index=True
    )
    genre = Column(String, index=True)
    length = Column(Integer, index=True)

    artist = relationship("Artist", back_populates="songs")
    playlist = relationship(
        "Playlist", secondary=songs_playlists_association, back_populates="songs"
    )
    album = relationship("Album", back_populates="songs")
    ratings = relationship("Rating", back_populates="song", cascade="all, delete")

    def __repr__(self):
        return (
            f"<Song {self.title} {self.artist} {self.album} {self.genre} {self.length}>"
        )
```

### Search Index

We're using Elasticsearch for the search index. It is set up locally.

### Index Mapping

We have defined the index mapping in the `search.py` file. The difference between Postgres data, and Elasticsearch data is the storing of the `tags` field. The `tags` field is a list of strings, and is used for searching.

### Song Index Mapping (Example)

```python
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
                "tags": {"type": "keyword"},
            }
        }
    }
```

### Note

- The `tags` field is a list of strings, and is used for searching.
- The `tags` are populated for `songs`, `albums`, and `artists`.

## API Documentation

You can use the Swagger UI to test the API. It is available at `http://localhost:8080/docs`.
Additionally, check the [API Postman Documentation](/docs_assets/postman.json) with examples, and sample requests.


## Setup

To set the project up locally, we'll be using venvs.

- Create a virtual environment

```bash
pip install virtualenv
virtualenv venv
```

- Activate the virtual environment

```bash
.\venv\Scripts\activate
```

- Install the dependencies

```bash
pip install -r requirements.txt
```

- Run the project

```bash
uvicorn app:app --reload --port 8080
```


## Backing up PostgreSQL

### Backup Steps

- Open a Command Prompt and navigate to the PostgreSQL `bin` directory. Replace `16` with your PostgreSQL version.
```bash
cd "C:\Program Files\PostgreSQL\16\bin"
```
- Replace `postgres`, `rhythmb`, and the output file path accordingly.

```bash
pg_dump -U postgres -d rhythmb > "C:\Users\Niyas Hameed\Desktop\rhythmb.sql"
```
- Enter your PostgreSQL password when prompted.
- Open the output file in a text editor and verify that it contains the database schema and data.

### Restore Steps

- Open a Command Prompt and navigate to the PostgreSQL `bin` directory. Replace `16` with your PostgreSQL version.
```bash
cd "C:\Program Files\PostgreSQL\16\bin"
```
- Replace `postgres`, `rhythmb`, and the input file path accordingly.

```bash
psql -U postgres -d rhythmb < "C:\Users\Niyas Hameed\Desktop\rhythmb.sql"
```

- Enter your PostgreSQL password when prompted.


### Elasticsearch Installation Steps

- Download the Elasticsearch zip file from [here](https://www.elastic.co/downloads/elasticsearch).
- Extract the zip file to a location of your choice.
- Navigate to the Elasticsearch bin directory and run the `elasticsearch.bat` file.

```bash
cd "C:\Users\Niyas Hameed\Desktop\elasticsearch-7.12.1\bin"
elasticsearch.bat
```

- Open a browser and navigate to `http://localhost:9200/`. You should see a json response

```json
{
  "name" : "DESKTOP-1QJQJ8J",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "2bY5QXZrQX2Z3Z2Z3Z2Z3Q",
  "version" : {
    "number" : "7.12.1",
    "build_flavor" : "default",
    "build_type" : "zip",
    "build_hash" : "3186837139b9c6b6d23c3200870651f10d3343b7",
    "build_date" : "2021-04-20T20:56:39.040728659Z",
    "build_snapshot" : false,
    "lucene_version" : "8.8.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```


### Kibana Installation Steps

- Download the Kibana zip file from [here](https://www.elastic.co/downloads/kibana).
- Extract the zip file to a location of your choice.
- Navigate to the Kibana bin directory and run the `kibana.bat` file.

```bash
cd "C:\Users\Niyas Hameed\Desktop\kibana-7.12.1-windows-x86_64\bin"
kibana.bat
```

- Open a browser and navigate to `http://localhost:5601/`. You should see the Kibana home page.

### Note

If you are unable to run Kibana, try changing the `server.port` and `server.host` properties in the `kibana.yml` file. You can find the file in the Kibana config directory.

```bash
C:\Users\Niyas Hameed\Desktop\kibana-7.12.1-windows-x86_64\config
```

Make sure that, if you run Elasticsearch locally, you have changed the `elasticsearch.hosts` property in the `kibana.yml` file to `http://localhost:9200`.

## Backing up Elasticsearch

- Set up path.repo

Open the elasticsearch.yml file and add the following lines.

```bash
path.repo: "C:/Users/Niyas Hameed/Desktop/backup"
```

- Open Kibana and navigate to `Management > Stack Management > Snapshot and Restore > Repositories`.
- Click on `Create repository` and enter the details.
- Click on `Create policy` and enter the details.
- Navigate to `Management > Stack Management > Snapshot and Restore > Snapshots`.

Run the policy, and it will create a snapshot and store it in the repository.


## More about the dataset

The dataset was manually curated by @niyasrad, which contains over

- 172 Songs
- 41 Albums
- 14 Artists
- 4 Main Genres

The data is populated via the `/populate` route, which takes in a CSV of all the song meta data - Title, Aritst, Album, Genre, Length. The CSV is parsed, and the data is inserted into the database. The `tags` field is populated for `songs`, `albums`, and `artists`. The `tags` field is a list of strings, and is used for searching.


MP3 Files, are directly downloaded over from YouTube using `FFMpeg`, and at the worst possible quality, download and audio conversion for 172 songs takes roughly, 90 minutes.

Album Artwork, and song tags are taken via the `Last FM API`. All of the MP3, and all of the album artwork is stored as a static file over `cdn_assets/` folder in the backend, and is accessible easily for the front-end.

![Alt text](frontend/src/assets/logo/rb.svg)

## K8s Deployment & Services

First, we'll need a certificate (.PEM format) to bypass the `https` error.
Once minikube is installed,

```bash
minikube start
```

If you're using Windows, This is to use the docker daemon inside minikube. Else, use `eval $(minikube docker-env)` for Linux.

```bash
$(minikube docker-env)
```

To activate the minikube docker daemon in powershell, use the following command,

```bash
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

To access the minikube dashboard,

```bash
minikube dashboard
```

### Postgres K8

Create a Dockerfile, sample given here with the back-up script
```
FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=user
ENV POSTGRES_DB=rhythmb

ENV PGDATA=/var/tmp/hostpath-provisioner/postgresql/data
RUN mkdir -p $PGDATA && chown -R postgres:postgres $PGDATA

COPY ./rhythmb.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
```

Build the image,
```bash
docker build -t rhythmb-postgres .
```

Create a deployment, service refer to the `k8.yaml` in the repo for sample. This is an example for the Persistent Volume,

```yml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgres-pv
  labels:
    type: local
    app: postgres
spec:
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  hostPath:
    path: /var/tmp/hostpath-provisioner/postgresql/data
```

## Frontend NGINX K8

Create a Dockerfile, sample given here with the back-up script
```
FROM node:21-alpine3.18 as build-stage
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

And here, let's focus on the proxy to back-end in `nginx.conf` file,

```conf
location /api/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header content_type "application/json";

        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE";
        add_header Access-Control-Allow-Headers "Authorization";

        proxy_set_header Authorization $http_authorization;

        proxy_pass_request_headers on;
        proxy_http_version 1.1;
        proxy_request_buffering off;
        proxy_buffering off;

        rewrite ^/api(/.*)$ $1 break;
        proxy_pass http://backend-service:8000/;
    }
```

The concept here is that, the `nginx` container will be running on port `80`, and the `backend-service` will be running on port `8000`. So, we're proxying the requests from `nginx` to `backend-service`. This ensures that, the browser doesn't throw not found errors, and the requests are proxied to the backend service in K8s without any issues.

This is useful when you're using a single domain, and you want to proxy the requests to the backend service. This is also useful when you're using a single domain, and you want to proxy the requests to the backend service, and you want to use a single domain for both the frontend and the backend.

## Redis Caching 

The project involves Redis caching. The way it works is, instead of hitting the DB for every single `UUID` query with `GET` endpoint, we'll store the song data, and cache it in Redis, which runs as a k8 depoyment, and is accessed via service. This ensures optimal way of using the Database, and avoids a lot of performance issues.

```
FROM redis:latest
COPY redis.conf /usr/local/etc/redis/redis.conf
EXPOSE 6379

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
```

The Dockerfile for Redis, uses a `.conf` file, which ensures security and other options.

### Note

- You can use imagePullPolicy: Never, if you're using a local image.
- You can use imagePullPolicy: Always, if you're using a remote image.
- Also write the `PVC`, `PV` for the postgres instance. Refer to the `k8.yaml` in the repo for sample.
- Do not have multiple replicas for the postgres instance, as it will cause issues with the database, and the storing of data. (Might store different data in different pods, and will cause issues with the database)
- Instead of port-forwarding, using the proxy with nginx is a better option, as it will ensure that the requests are proxied to the backend service in K8s without any issues in local development, as well as in production.

Once done, apply the yaml file,

```bash
kubectl apply -f k8.yaml
```

This will create a deployment, and a service for the postgres instance. Check the status of these using,

```bash
kubectl get deployments
kubectl get services
kubectl get pods
kubectl get pvc
kubectl get pv
```

If you have any issues, you can check the logs using,

```bash
kubectl describe pods
```

## Helm Chart for K8s

Helm is a package manager for Kubernetes. It is the best way to find, share, and use software built for Kubernetes. Helm is a tool that streamlines installing and managing Kubernetes applications. Think of it like apt/yum/homebrew for Kubernetes.

- Frontend - Deployment, Service
- Backend - Deployment, Service
- Redis - Deployment, Service
- Postgres - Deployment, Service, PV, PV-Claim

To use the helm chart, install helm in your local machine, and run the following commands,

```bash
helm install rhythmb ./helm-rhythmb/helm-rhythmb-0.1.0.tgz
```

You can edit the `values.yaml` file in the `helm-rhythmb` folder to change the values, and the number of replicas, and other options. But if you're running locally, it's preferred to use the default values.

If you did not make any changes to the `values.yaml` file, you can use the following command to install the helm chart,

```bash
helm package ./helm-rhythmb
```

This will create a `.tgz` file, which you can use to install the helm chart.

To check the status of the helm chart, use the following command,

```bash
helm ls
```

To check the status of the pods, and services, use the following command,

```bash
kubectl get pods
kubectl get services
```



## Thank you! You can check out my other projects!
