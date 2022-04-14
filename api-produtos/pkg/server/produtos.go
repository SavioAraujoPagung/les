package server

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/SavioAraujoPagung/les/pkg/models"
	"github.com/SavioAraujoPagung/les/pkg/repository"
	"github.com/gorilla/mux"
)

// Id das permissão que para cada funcionalidade
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

	idProduto, err := strconv.Atoi(id)
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

	produto, err := repo.Buscar(idProduto)
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

	var venda models.Venda
	body, err := io.ReadAll(request.Body)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = json.Unmarshal(body, &venda)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	venda.Quantidade = len(venda.ProdutosVendidos)
	venda.Criacao = time.Now()
	err = executarVendas(repo, &venda)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

}

func permitido(repo repository.Repository, idUsuario int, idPermissao int) bool {
	permitido, _ := repo.Permissao(idUsuario, idPermissao)
	return permitido
}

func executarVendas(repo repository.Repository, venda *models.Venda) error {
	err := repo.Vender(venda)
	if err != nil {
		return err
	}

	//todo:: preciso deixar o id do produto igual ao igual ao id da venda
	amount := 2

	for i := 0; i > amount; i ++{
		venda.ProdutosVendidos[i].VendaID = venda.ID
	}
	venda.ProdutosVendidos[0].VendaID = 28
	venda.ProdutosVendidos[1].VendaID = 28
	// fmt.Println(produtosVendido)
	for _, produtosVendido := range venda.ProdutosVendidos {
		produtosVendido.VendaID = venda.ID
	}

	err = repo.Vendas(venda.ProdutosVendidos)
	return err
}
