package server

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

const dsn = "host=172.17.0.1 user=root password=root dbname=pulini_supermercado_db port=5432 sslmode=disable"

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

func Run() {
	PORT := ":8000"
	muxRoute := mux.NewRouter()

	muxRoute.HandleFunc("/produtos", inserir).Methods(http.MethodPost)
	muxRoute.HandleFunc("/produtos", listar).Methods(http.MethodGet)
	muxRoute.HandleFunc("/produtos/{id}", buscar).Methods(http.MethodGet)
	muxRoute.HandleFunc("/produtos/{barras}", adicionar).Methods(http.MethodPut)
	muxRoute.HandleFunc("/produtos/vender", vender).Methods(http.MethodPost)
	
	muxRoute.HandleFunc("/cliente", inserirCliente).Methods(http.MethodPost)
	muxRoute.HandleFunc("/cliente/{cpf}", buscarCliente).Methods(http.MethodGet)
	muxRoute.HandleFunc("/cliente/entrada", entrada).Methods(http.MethodPost)

	srv := &http.Server{
		Handler:      CORSMiddleware(muxRoute),
		Addr:         fmt.Sprintf("0.0.0.0%s", PORT),
		WriteTimeout: 120 * time.Second,
		ReadTimeout:  120 * time.Second,
	}

	log.Println("API is online ", PORT)
	log.Fatal(srv.ListenAndServe())

}
