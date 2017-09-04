package main

import (
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
	"time"
)

func Logger(route Route) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		start := time.Now()

		route.Handler(w, r, ps)

		log.Printf(
			"%s \t%s \t%s",
			route.Method,
			route.Path,
			time.Since(start),
		)
	}
}
