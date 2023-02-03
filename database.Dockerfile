FROM postgres:14

RUN apt update
RUN apt install -y postgis postgresql-14-postgis-3


COPY ./packages/database/schema.sql /docker-entrypoint-initdb.d/
COPY ./packages/database/functions.sql /docker-entrypoint-initdb.d/
COPY ./packages/database/procedures.sql /docker-entrypoint-initdb.d/
COPY ./packages/database/views.sql /docker-entrypoint-initdb.d/
COPY ./packages/database/triggers.sql /docker-entrypoint-initdb.d/