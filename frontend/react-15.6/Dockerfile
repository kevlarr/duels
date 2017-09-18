FROM node:8.4-alpine
MAINTAINER kevin larrabee

RUN apk update && rm -rf /var/cache/apk

RUN addgroup -S planetexpress \
 && adduser -S -g planetexpress bender

USER bender

COPY app/entry.sh /app/entry.sh

WORKDIR /app

ENTRYPOINT ["./entry.sh"]

CMD ["node_modules/.bin/http-server"]
