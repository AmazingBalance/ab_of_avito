package main

import (
	"encoding/json"
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

	NewRoute("/api/edit", HandleEdit)
}

func Welcome(w http.ResponseWriter, _ *http.Request) {
	fmt.Fprintf(w, "Hello there sysadmin.")
}

func HandleEdit(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		RespondEdit(w, r)
	case http.MethodPost:
		CatchEdit(w, r)
	default:
		http.Error(w, "That's illegal, Sorry can't do that.", http.StatusMethodNotAllowed)
	}
}

func RespondEdit(w http.ResponseWriter, r *http.Request) {
	// For communication
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	fmt.Fprintf(w, "Hello there.")
	log.Println("Responded to edit request.")
}

func CatchEdit(w http.ResponseWriter, r *http.Request) {
	log.Println("Catching stuff.")
	var stuff string

	if err := json.NewDecoder(r.Body).Decode(&stuff); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func main() {
	Router()

	log.Println("Starting server...")
	err := http.ListenAndServe(PORT, nil)
	if err != nil {
		log.Fatal("Server is unable to start.")
		log.Fatal(err.Error())
	}
}
