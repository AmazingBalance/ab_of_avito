package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"ab_of_avito/modules"
	"ab_of_avito/tosting"
)

const PORT string = ":6969"

func NewRoute(pattern string, handler func(http.ResponseWriter, *http.Request)) {
	// Create new route and log it's name and url
	log.Println("Adding new route at: http://localhost" + PORT + pattern)
	http.HandleFunc(pattern, handler)
}

func HeaderSetter(w http.ResponseWriter) {
	// Set some needed headers. It doesn't work without them. Atleast for me (Boiiterra)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func Router() {
	// Testing routes. If you connect to server directly
	NewRoute("/hello", tosting.Welcome) // Inacceseble from Frontend side
	NewRoute("/json", tosting.Testing)  // Testing JSON communication
	NewRoute("/api/getMatrixNOOO", getMatrixNOOO)

	NewRoute("/NotYetDone", NotYetDone)

	NewRoute("/api/getCategories", getCats)

	NewRoute("/api/getLocations", NotYetDone)
	NewRoute("/api/getPrice", NotYetDone)
	NewRoute("/api/getData", NotYetDone)
	NewRoute("/api/createDatabase", NotYetDone)
	NewRoute("/api/createStorage", NotYetDone)
	NewRoute("/api/editDatabase", NotYetDone)
	NewRoute("/api/getStorage", NotYetDone)
}

func NotYetDone(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	switch r.Method {
	case http.MethodPost:
		defer r.Body.Close()

		var tmp struct {
			Status string `json:"status"`
		}
		tmp.Status = "NotYetDone"

		rb, err := json.Marshal(tmp)
		if err != nil {
			log.Fatal("Failing to make response.")
			http.Error(w, "Something went wrong packing JSON.", http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(rb)
	case http.MethodGet:
		defer r.Body.Close()

		var tmp struct {
			Status string `json:"status"`
		}
		tmp.Status = "NotYetDone"

		rb, err := json.Marshal(tmp)
		if err != nil {
			log.Fatal("Failing to make response.")
			http.Error(w, "Something went wrong packing JSON.", http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(rb)
	default:
		http.Error(w, "No no No no", http.StatusMethodNotAllowed)
	}
}

func getCats(w http.ResponseWriter, r *http.Request) {
	HeaderSetter(w)

	if r.Method == http.MethodGet {
		defer r.Body.Close()

		row, err := modules.Selector("data/baseline_matrix_1.db", 61, 4108)
		if err != nil {
			http.Error(w, "Invalid data.", http.StatusBadRequest)
		}

		log.Println("Row")
		log.Println(row)

		rb, err := json.Marshal("NOT IMPLEMENTED")
		if err != nil {
			http.Error(w, "JSON creating went wrong.", http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(rb)
	}
}

func getMatrixNOOO(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	if r.Method == http.MethodPost {
		defer r.Body.Close()
		var data modules.Row

		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			log.Fatal(err)
			http.Error(w, "Weird JSON recieved", http.StatusBadRequest)
		}
		log.Println(data)

		var tmp struct {
			Status string `json:"status"`
		}
		tmp.Status = "positive"

		rb, err := json.Marshal(tmp)
		if err != nil {
			log.Fatal("Failing to make response.")
			http.Error(w, "Something went wrong packing JSON.", http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(rb)
	}
}

func main() {
	Router()

	log.Println("Starting server...")
	log.Println(fmt.Sprintf("Server is using port %s.", PORT))
	err := http.ListenAndServe(PORT, nil)
	if err != nil {
		log.Fatal("Server is unable to start.")
		log.Fatal(err.Error())
	}
}
