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

func (r *Repository) Listar(categoria int) ([]produtos.Produto, error) {
	var err error
	var produtos []produtos.Produto

	err = r.db.Where("id_categoria = ?", categoria).Find(&produtos).Error
	
	return produtos, err
}

func (r *Repository) Buscar(id int) (produtos.Produto, error) {
	var produto produtos.Produto
	err := r.db.Where(&produtos.Produto{Id: id}).First(&produto).Error
	return produto, err
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

func (r *Repository) Permissao(idUsuario int, idFuncionalidade int) (bool, error) {
	var err error
	permissao := &funcionalidadeUsuario{}
	err = r.db.Where(&funcionalidadeUsuario{Usuario: idUsuario, Funcionalidade: idFuncionalidade}).Find(&permissao).Error

	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(permissao)
	if permissao.Usuario == idUsuario {
		return true, err
	}
	return false, err
}
