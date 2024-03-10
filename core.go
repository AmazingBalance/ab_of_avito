package main

import (
	"fmt"
	"log"
	"net/http"
)

const PORT string = ":6969"

func router() {
	http.HandleFunc("/", welcome) // Inacceseble from Frontend
}

func welcome(w http.ResponseWriter, _ *http.Request) {
	fmt.Fprintf(w, "Hello there sysadmin.")
}

func main() {
	router()

	log.Println("Starting server...")
	err := http.ListenAndServe(PORT, nil)
	if err != nil {
		log.Fatal("Server is unable to start.")
		log.Fatal(err.Error())
	}
}
