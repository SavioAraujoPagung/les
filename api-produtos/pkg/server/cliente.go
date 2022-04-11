package server

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"

	"github.com/SavioAraujoPagung/les/pkg/models"
	"github.com/SavioAraujoPagung/les/pkg/repository"
	"github.com/gorilla/mux"
)

// Id das permissão que para cada funcionalidade
const (
	INSERIRCLIENTE = 1
	BUSCARCLIENTE  = 1
)

func inserirCliente(writer http.ResponseWriter, request *http.Request) {
	body, err := io.ReadAll(request.Body)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	idUsuario := request.URL.Query().Get("idUsuario")
	id, err := strconv.Atoi(idUsuario)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	permitido, err := repo.Permissao(id, INSERIRCLIENTE)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}
	if !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	var cliente models.Cliente
	err = json.Unmarshal(body, &cliente)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = repo.InserirCliente(&cliente)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	writer.WriteHeader(http.StatusCreated)

}

func buscarCliente(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	idCliente, err := strconv.Atoi(id)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	idQuery := request.URL.Query().Get("idUsuario")
	idUsuario, err := strconv.Atoi(idQuery)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	permitido, err := repo.Permissao(idUsuario, BUSCARCLIENTE)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}
	if !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	cliente, err := repo.BuscarCliente(idCliente)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	body, err := json.Marshal(cliente)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	writer.Write(body)
}
