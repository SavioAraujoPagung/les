package repository

import (
	"github.com/SavioAraujoPagung/les/pkg/produtos"
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
	Inserir(produto produtos.Produto) error
	Listar() error
	Buscar(id int) error
	Vender(id int) error
	conectar(dsn string) error
	Permissao(idUsuario int) (bool, error)
}

func Conectar(repo Db, strC string) error {
	return repo.conectar(strC)
}
