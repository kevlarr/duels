FROM golang:1.8.3-alpine

RUN apk update && apk upgrade && apk add \
	git=2.11.3-r0 \
	vim=8.0.0329-r0 \
	&& rm -rf /var/cache/apk/* \
	&& go get github.com/julienschmidt/httprouter \
	&& adduser -S korben

WORKDIR /go/src/app
RUN go build .

USER korben
CMD ["./app"]
