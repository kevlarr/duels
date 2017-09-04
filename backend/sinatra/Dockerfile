# Minimal Ruby/Sinatra image
FROM ruby:2.4.1-slim-jessie
MAINTAINER kevin larrabee

RUN apt-get update && apt-get install -y \
  gcc \
  libpq-dev \
  make

# TODO:
# clear cache
# create user
# login as user

COPY ./app /sinatra/app
WORKDIR /sinatra/app
RUN touch Gemfile.lock && bundle install

CMD ["ruby", "server.rb", "-o", "0.0.0.0"]
