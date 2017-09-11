# Minimal Ruby/Sinatra image
FROM ruby:2.4.1-slim-jessie
MAINTAINER kevin larrabee

RUN \
  apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    make \
  && apt-get clean

RUN \
  groupadd -r planetexpress && \
  useradd --no-log-init -g planetexpress fry

USER fry

COPY app/entry.sh /sinatra/app/entry.sh

WORKDIR /sinatra/app

ENTRYPOINT ["./entry.sh"]

CMD ["bundle", "exec", "ruby", "server.rb"]
