package repository

import (
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

func (r *Repository) Buscar(id int) error {
	var err error
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
