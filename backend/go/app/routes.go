package main

import (
	"github.com/julienschmidt/httprouter"
)

type Route struct {
	Method  string
	Path    string
	Handler httprouter.Handle
}

var routes = []Route{
	Route{"GET", "/", Root},
	Route{"GET", "/api/v1/books", BookIndex},
	Route{"POST", "/api/v1/books", BookCreate},
	Route{"GET", "/api/v1/books/:id", BookShow},
}

