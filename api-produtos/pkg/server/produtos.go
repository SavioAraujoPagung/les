package server

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"

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
	log.Println("Inserindo Produto")
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
	log.Println("Listar produtos")
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
	log.Println("Buscar produto")
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

func buscarRfid(writer http.ResponseWriter, request *http.Request) {
	log.Println("Buscar produto RFID")
	vars := mux.Vars(request)
	rfid := vars["rfid"]
	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	usuario := request.URL.Query().Get("idUsuario")
	idUsuario, err := strconv.Atoi(usuario)
	if err != nil {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	if permitido := permitido(repo, idUsuario, BUSCAR); !permitido {
		writer.WriteHeader(http.StatusUnauthorized)
		return
	}

	produto, err := repo.BuscarRFID(rfid)
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

type terminal struct {
	Nome       string
	Quantidade int
}

func buscarPorBarra(writer http.ResponseWriter, request *http.Request) {
	log.Println("Buscar produto")
	vars := mux.Vars(request)
	codigoBarra := vars["codigo_barra"]
	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	codigoBarraProduto := string(codigoBarra)

	// usuario := request.URL.Query().Get("idUsuario")
	// idUsuario, err := strconv.Atoi(usuario)
	// if err != nil {
	// 	writer.WriteHeader(http.StatusBadGateway)
	// 	return
	// }

	// if permitido := permitido(repo, idUsuario, BUSCAR); !permitido {
	// 	writer.WriteHeader(http.StatusUnauthorized)
	// 	return
	// }

	produto, err := repo.BuscarBarras(codigoBarraProduto)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	terminalBody := terminal{
		Nome:       produto.Nome,
		Quantidade: produto.Quantidade,
	}
	body, err := json.Marshal(terminalBody)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	writer.Write(body)
}

func vender(writer http.ResponseWriter, request *http.Request) {
	usuario := request.URL.Query().Get("idUsuario")
	rfid := request.URL.Query().Get("rfid")
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
	//encontra a venda em aberto
	venda, err := repo.BuscarVendaClienteAtivoCPF(rfid)
	if venda.ClienteID == 0 { //caso n tenha venda em aberto (cliente não teve entrada registrada pelo fiscal de entrada)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	//atualiza adiciona os produtos nas vendas
	body, err := io.ReadAll(request.Body)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = json.Unmarshal(body, venda)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	venda, err = executarVendas(repo, venda)
}

func adicionar(writer http.ResponseWriter, request *http.Request) {
	log.Println("Adicionar")
	vars := mux.Vars(request)
	barrasVar := vars["barras"]

	var repo repository.Repository
	repository.Conectar(&repo, dsn)

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

	produto, err := repo.BuscarBarras(barrasVar)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	produto.Quantidade = produto.Quantidade + 1
	produto, err = repo.Atualizar(produto)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	produtos := []*models.Produto{}

	produtos = append(produtos, produto)

	body, err := json.Marshal(produtos)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	writer.Write(body)
}

func permitido(repo repository.Repository, idUsuario int, idPermissao int) bool {
	permitido, _ := repo.Permissao(idUsuario, idPermissao)
	return permitido
}

//responsável por diminuir o estoque dos produtos
func executarVendas(repo repository.Repository, venda *models.Venda) (*models.Venda, error) {
	tam := len(venda.ProdutosVendidos)
	precoVenda := venda.ValorTotal

	for i := 0; i < tam; i++ {
		venda.ProdutosVendidos[i].VendaID = venda.ID

		err := repo.Vender(&venda.ProdutosVendidos[i])
		if err != nil {
			return nil, err
		}
		
		venda.Quantidade += venda.ProdutosVendidos[i].Quantidade
		
		if venda.ProdutosVendidos[i].Preco > 0 {
			precoVenda += venda.ProdutosVendidos[i].Preco
		} else {
			prod, err := repo.BuscarRFID(venda.ProdutosVendidos[i].ProdutoRfid)
			if err != nil {
				return nil, err
			}
			precoVenda += prod.PrecoVenda
		}
	}

	err := repo.ProdutoVenda(venda.ProdutosVendidos)
	if err != nil {
		return nil, err
	}

	venda.ValorTotal = precoVenda
	_, err = repo.AtualizarVenda(venda)
	if err != nil {
		return nil, err
	}

	return venda, nil
}

func novaVenda(repo repository.Repository, venda models.Venda) error {
	err := repo.Vendas(&venda)
	if err != nil {
		return err
	}

	if len(venda.ProdutosVendidos) > 0 {
		err := repo.ProdutoVenda(venda.ProdutosVendidos)
		return err
	}

	return nil
}

func finalizar(writer http.ResponseWriter, request *http.Request) {
	var repo repository.Repository
	repository.Conectar(&repo, dsn)

	vars := mux.Vars(request)
	rfidCliente := vars["clienteRFID"]

	clientes, err := repo.BuscarClienteAtivo(rfidCliente)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	
	venda := &models.Venda {}
	for _, cliente := range *clientes {
		venda, err = repo.BuscarVendaClienteAtivoCPF(cliente.Cpf)
		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			return
		}
	}

	err = repo.FinalizarVenda(venda)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
}