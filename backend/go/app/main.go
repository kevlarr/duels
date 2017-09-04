package main

import (
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
)

func main() {
	router := httprouter.New()
	router.GET(
		"/", Root)
	router.GET(
		"/api/v1/books", BookIndex)
	router.POST(
		"/api/v1/books", BookCreate)
	router.GET(
		"/api/v1/books/:id", BookShow)

	log.Fatal(http.ListenAndServe(":8080", router))
}
