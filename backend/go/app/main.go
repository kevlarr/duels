package main

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
)

type Book struct {
	Title       string `json:"title"`
	Author      string `json:"author"`
	Description string `json:"description"`
}

type Books []Book

func root(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Hello, says Go!\n")
}

func bookIndex(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	books := Books{
		Book{
			Title:       "Ben's Bountiful Bosons",
			Author:      "Ben Kenobi",
			Description: "A jedi discusses quantum mechanics",
		},
		Book{
			Title:       "Zoolander's Guide to Zoology",
			Author:      "Zoolander",
			Description: "Zoolander is a better writer than Hansel because he writes books large enough to read good",
		},
	}

	json.NewEncoder(w).Encode(books)
}

func bookCreate(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
}

func bookShow(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Fprintf(w, "hello, book %s!\n", ps.ByName("id"))
}

func main() {
	router := httprouter.New()
	router.GET("/", root)

	router.GET(
		"/api/v1/book", bookIndex)
	router.POST(
		"/api/v1/book", bookCreate)
	router.GET(
		"/api/v1/book/:id", bookShow)

	log.Fatal(http.ListenAndServe(":8080", router))
}
