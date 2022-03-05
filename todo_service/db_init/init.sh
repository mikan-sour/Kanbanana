#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$POSTGRES_DB"<<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

   CREATE TABLE IF NOT EXISTS todos 
      (
         id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
         owner_id uuid NOT NULL, 
         title VARCHAR(255) NOT NULL,
         details TEXT,
         priority INT NOT NULL, 
         status VARCHAR(10) NOT NULL,
         order_in_column INT NOT NULL,
         due_date timestamp without time zone, 
         created_date timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'), 
         last_modified_date timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
      );

EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$POSTGRES_DB" -p < dataload.sql


