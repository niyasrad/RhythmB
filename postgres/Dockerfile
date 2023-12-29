FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=user
ENV POSTGRES_DB=rhythmb

ENV PGDATA=/var/tmp/hostpath-provisioner/postgresql/data
RUN mkdir -p $PGDATA && chown -R postgres:postgres $PGDATA

COPY ./rhythmb.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
