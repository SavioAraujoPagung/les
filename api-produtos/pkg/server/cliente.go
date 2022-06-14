package server

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/SavioAraujoPagung/les/pkg/models"
	"github.com/SavioAraujoPagung/les/pkg/repository"
	"github.com/gorilla/mux"
)

// Id das permissão que para cada funcionalidade
const (
	INSERIRCLIENTE = 1
	BUSCARCLIENTE  = 1
	ENTRADACLIENTE = 1
	CAFETERIA      = 1
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
	log.Println("Buscar cliente")
	vars := mux.Vars(request)
	cpf := vars["cpf"]
	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	idQuery := request.URL.Query().Get("idUsuario")
	idUsuario, err := strconv.Atoi(idQuery)
	if err != nil {
		writer.WriteHeader(http.StatusUnauthorized)
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

	cliente, err := repo.BuscarCliente(cpf)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	b := []models.Cliente{}
	b = append(b, *cliente)
	body, err := json.Marshal(b)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	writer.Write(body)
}

func entrada(writer http.ResponseWriter, request *http.Request) {
	log.Println("Entrada de cliente")
	usuario := request.URL.Query().Get("idUsuario")
	idUsuario, err := strconv.Atoi(usuario)
	if err != nil {
		log.Println("arqui")
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	if permitido := permitido(repo, idUsuario, ENTRADACLIENTE); !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	cpf := request.URL.Query().Get("cpf")
	cliente, err := repo.BuscarCliente(cpf)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	var venda models.Venda
	venda.ClienteID = cliente.ID
	venda.Criacao = time.Now()

	err = novaVenda(repo, venda)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
}

func dentro(writer http.ResponseWriter, request *http.Request) {
	log.Println("Cliente Ativos")
	usuario := request.URL.Query().Get("idUsuario")
	idUsuario, err := strconv.Atoi(usuario)
	if err != nil {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	if permitido := permitido(repo, idUsuario, CAFETERIA); !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	clientes, err := repo.BuscarTodosClientesAtivos()
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	body, err := json.Marshal(clientes)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}
	writer.Write(body)
}


func clienteAtivo(writer http.ResponseWriter, request *http.Request) {
	log.Println("Cliente Ativos")
	usuario := request.URL.Query().Get("idUsuario")
	idUsuario, err := strconv.Atoi(usuario)
	if err != nil {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	if permitido := permitido(repo, idUsuario, CAFETERIA); !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}
	vars := mux.Vars(request)
	rfid := vars["rfid"]

	clientes, err := repo.BuscarClienteAtivo(rfid)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}

	body, err := json.Marshal(clientes)
	if err != nil {
		writer.WriteHeader(http.StatusBadGateway)
		return
	}
	writer.Write(body)
}
