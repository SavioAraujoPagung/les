package repository

import (
	"github.com/SavioAraujoPagung/les/pkg/models"
)

type funcionalidadeUsuario struct {
	Funcionalidade int `gorm:"column:id_funcionalidade"`
	Usuario        int `gorm:"column:id_usuario"`
}
type Funcionalidade struct {
	Id   int    `gorm:"column:id"`
	Nome string `gorm:"column:nome"`
}

type Db interface {
	Inserir(produto *models.Produto) error
	Listar(categoria int) ([]models.Produto, error)
	Buscar(id int) (*models.Produto, error)
	Vender(venda* models.Venda) error
	Vendas(produto []models.ProdutoVenda) error

	InserirCliente(cliente *models.Cliente) error
	BuscarCliente(id int) (*models.Cliente, error)

	conectar(dsn string) error
	Permissao(idUsuario int, idFuncionalidade int) (bool, error)
}

func Conectar(repo Db, strC string) error {
	return repo.conectar(strC)
}
