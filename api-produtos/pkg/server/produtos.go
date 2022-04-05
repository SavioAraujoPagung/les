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

const dsn = "host=localhost user=root password=root dbname=pulini_supermercado_db port=5432 sslmode=disable"

//id das permissão que para cada funcionalidade
const (
	INSERIR = 1
	BUSCAR  = 1
	LISTA   = 1
	VENDER  = 1
)

func inserir(writer http.ResponseWriter, request *http.Request) {
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

	permitido, err := repo.Permissao(id, INSERIR)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}
	if !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	var produto models.Produto
	err = json.Unmarshal(body, &produto)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = repo.Inserir(&produto)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	writer.WriteHeader(http.StatusCreated)
}

func listar(writer http.ResponseWriter, request *http.Request) {
	usuario := request.URL.Query().Get("idUsuario")
	categoria := request.URL.Query().Get("categoria")

	idUsuario, err := strconv.Atoi(usuario)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	id_categoria, err := strconv.Atoi(categoria)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	if permitido := permitido(repo, idUsuario, BUSCAR); !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	produtos, err := repo.Listar(id_categoria)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}
	body, err := json.Marshal(produtos)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	writer.Write(body)
}

func buscar(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	par, err := strconv.Atoi(id)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	usuario := request.URL.Query().Get("idUsuario")
	idUsuario, err := strconv.Atoi(usuario)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	if permitido := permitido(repo, idUsuario, BUSCAR); !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	produto, err := repo.Buscar(par)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	body, err := json.Marshal(produto)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	writer.Write(body)
}

func vender(writer http.ResponseWriter, request *http.Request) {
	usuario := request.URL.Query().Get("idUsuario")
	idUsuario, err := strconv.Atoi(usuario)
	if err != nil {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	if permitido := permitido(repo, idUsuario, VENDER); !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	//var venda models.Venda
	var produtosVendidos[] models.ProdutoVendido
	body, err := io.ReadAll(request.Body)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = json.Unmarshal(body, &produtosVendidos)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	for _, produtoVendido := range produtosVendidos {
		repo.Vender(produtoVendido)
	}

}

func permitido(repo repository.Repository, idUsuario int, idPermissao int) bool {
	permitido, _ := repo.Permissao(idUsuario, idPermissao)
	return permitido
}
