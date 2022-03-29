package server

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"

	"github.com/SavioAraujoPagung/les/pkg/produtos"
	"github.com/SavioAraujoPagung/les/pkg/repository"
	"github.com/gorilla/mux"
)

const dsn = "host=localhost user=root password=root dbname=pulini_supermercado_db port=5432 sslmode=disable"

func inserir(writer http.ResponseWriter, request *http.Request) {
	
	body, err := io.ReadAll(request.Body)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	var produto produtos.Produto
	err = json.Unmarshal(body, &produto)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	err = repo.Inserir(produto)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	writer.WriteHeader(http.StatusCreated)
	return
}

func listar(writer http.ResponseWriter, request *http.Request) {

	return
}

func buscar(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	fmt.Println(id)
	var repo repository.Repository
	repository.Conectar(&repo, dsn)
	par, _ := strconv.Atoi(id)
	err := repo.Buscar(par)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	//TODO: validar se o usuário tem permissão buscar um produto busca-lo por id
	return
}

func vender(writer http.ResponseWriter, request *http.Request) {

	return
}
