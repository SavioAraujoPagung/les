package server

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	}) 
}

func Run (){
	PORT := ":6666"
	muxRoute := mux.NewRouter()
	
	muxRoute.HandleFunc("/account", cadastrarProdutos).Methods("POST")


	srv := &http.Server{
		Handler:      CORSMiddleware(muxRoute),
		Addr:         fmt.Sprintf("0.0.0.0%s", PORT),
		WriteTimeout: 120 * time.Second,
		ReadTimeout:  120 * time.Second,
	}
	
	log.Println("API is online ", PORT)
	log.Fatal(srv.ListenAndServe())

}

func cadastrarProdutos(writer http.ResponseWriter, request *http.Request){
	
	return
}