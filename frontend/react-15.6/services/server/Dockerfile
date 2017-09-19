# Basic HTTP server for static bundle
FROM node:8.4-alpine
MAINTAINER kevin larrabee

RUN apk update && rm -rf /var/cache/apk

RUN npm install -g http-server

RUN addgroup -S planetexpress \
 && adduser -S -g planetexpress bender

USER bender

WORKDIR /app

CMD ["http-server"]
