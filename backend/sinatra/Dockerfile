# Minimal Ruby/Sinatra image
FROM ruby:2.3.4-alpine
MAINTAINER kevin larrabee

# Install packages and clear APK cache
RUN apk update && apk upgrade && apk add \
  bash \
  vim \
  && rm -rf /var/cache/apk/*

RUN adduser -S frankie
COPY app /home/frankie/app
RUN chmod a+rwx -R /home/frankie/app
USER frankie

WORKDIR /home/frankie/app

RUN bundle install
CMD ["ruby", "server.rb", "-o", "0.0.0.0"]
