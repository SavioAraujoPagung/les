package server

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/SavioAraujoPagung/les/pkg/produtos"
	"github.com/SavioAraujoPagung/les/pkg/repository"
)

const dsn = "host=localhost user=postgres password=root dbname=tosleep_db_dev port=5412 sslmode=disable"

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
	fmt.Println(produto)
	
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
