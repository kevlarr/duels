#!/bin/sh
bundle install --deployment
rake db:create
rake db:migrate
exec "$@"
