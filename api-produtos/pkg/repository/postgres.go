package repository

import (
	"fmt"

	"github.com/SavioAraujoPagung/les/pkg/produtos"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func (r *Repository) Inserir(produto produtos.Produto) error {
	return r.db.Create(produto).Error
}

func (r *Repository) Listar() error {
	var err error
	return err
}

func (r *Repository) Buscar(id int) (err error) {
	var produto produtos.Produto
	result := r.db.First(id, &produto)
	fmt.Println(result)
	return err
}

func (r *Repository) Vender(id int) error {
	var err error
	return err	
}

func (r *Repository) conectar(dsn string) error {
	var err error
	r.db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	return err
}

func (r *Repository) Permissao(idUsuario int) (bool, error) {
	var err error
	permissao := &funcionalidadeUsuario{}
	err = r.db.Where(&funcionalidadeUsuario{Usuario: idUsuario, Funcionalidade: 1}).Find(&permissao).Error

	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(permissao)
	if permissao.Usuario == idUsuario {
		return true, err
	}
	return false, err
}