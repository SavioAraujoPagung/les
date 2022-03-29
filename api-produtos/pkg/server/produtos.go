package server

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/SavioAraujoPagung/les/pkg/produtos"
	"github.com/SavioAraujoPagung/les/pkg/repository"
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

	return
}

func vender(writer http.ResponseWriter, request *http.Request) {

	return
}
