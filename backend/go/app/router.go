package main

import (
	"github.com/julienschmidt/httprouter"
)

func Router() *httprouter.Router {
	router := httprouter.New()

	for _, route := range routes {
		handler := Logger(route)

		router.Handle(
			route.Method,
			route.Path,
			handler,
		)
	}

	return router
}
