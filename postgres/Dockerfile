FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=user
ENV POSTGRES_DB=rhythmb

COPY ./rhythmb.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
