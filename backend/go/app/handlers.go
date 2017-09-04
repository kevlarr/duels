package main

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func Root(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Hello, says Go!\n")
}

func BookIndex(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
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

func BookCreate(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
}

func BookShow(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Fprintf(w, "hello, book %s!\n", ps.ByName("id"))
}
