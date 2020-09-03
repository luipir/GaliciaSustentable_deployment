#/bin/env bash
PGSERVICEFILE="`pwd`/.pg_service.conf" USERID="`id -u`" docker-compose up