package repository

import (
	"github.com/SavioAraujoPagung/les/pkg/produtos"
)

type Db interface {
	Inserir(produto produtos.Produto)
	Listar()
	Buscar(id int)
	Vender(id int)
	conectar(dsn string)
}

func Conectar(repo Db, strC string) {
	repo.conectar(strC)
}
