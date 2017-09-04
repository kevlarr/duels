package main

type Book struct {
	Title       string `json:"title"`
	Author      string `json:"author"`
	Description string `json:"description"`
}

type Books []Book
