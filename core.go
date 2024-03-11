package main

import (
	"fmt"
	"log"
	"net/http"
)

const PORT string = ":6969"

func NewRoute(pattern string, handler func(http.ResponseWriter, *http.Request)) {
	log.Println("Adding new route " + pattern)

	http.HandleFunc(pattern, handler)
}

func Router() {
	NewRoute("/", Welcome) // Inacceseble from Frontend
}

func illegal(w http.ResponseWriter) {
	http.Error(w, "That's illegal, Sorry can't do that.", http.StatusMethodNotAllowed)
}

func Welcome(w http.ResponseWriter, _ *http.Request) {
	fmt.Fprintf(w, "Hello there sysadmin.")
}

	// For communication
	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	// w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

func main() {
	Router()

	log.Println("Starting server...")
	err := http.ListenAndServe(PORT, nil)
	if err != nil {
		log.Fatal("Server is unable to start.")
		log.Fatal(err.Error())
	}
}
