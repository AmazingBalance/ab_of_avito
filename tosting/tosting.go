package tosting

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func tosting() {
	fmt.Println("Tosting")
}

func Testing(w http.ResponseWriter, r *http.Request) {
	// Test JSON communication with client
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	if r.Method == http.MethodPost {
		defer r.Body.Close()
		text := make(map[string]string)

		json.NewDecoder(r.Body).Decode(&text)
		log.Println(text["txt"])

		var tmp struct {
			Msg string `json:"msg"`
		}
		tmp.Msg = "Go is interesting and weird."

		rb, err := json.Marshal(tmp)
		if err != nil {
			log.Fatal("Failing to make response.")
			http.Error(w, "This is an error.", http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(rb)
	}
}

func illegal(w http.ResponseWriter) {
	// This method is not allowed error
	http.Error(w, "That's illegal, Sorry can't do that.", http.StatusMethodNotAllowed)
}

func Welcome(w http.ResponseWriter, _ *http.Request) {
	// Test basic response
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	fmt.Fprintf(w, "Hello there sysadmin.")
	log.Println("Respond sent.")
}
