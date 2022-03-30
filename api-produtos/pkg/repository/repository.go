package repository

import (
	"github.com/SavioAraujoPagung/les/pkg/produtos"
)

type Db interface {
	Inserir(produto produtos.Produto) error
	Listar() error
	Buscar(id int) error
	Vender(id int) error
	conectar(dsn string) error
}

func Conectar(repo Db, strC string) error {
	return repo.conectar(strC)
}
