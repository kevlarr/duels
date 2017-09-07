#!/bin/sh
bundle install --deployment
exec "$@"
