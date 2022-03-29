package repository

import (
	"log"

	"github.com/SavioAraujoPagung/les/pkg/produtos"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Repository struct {
	Db *gorm.DB
}

func (r *Repository) Inserir(produto produtos.Produto) {
	r.Db.Create(produto)
}

func (r *Repository) Listar() {

}

func (r *Repository) Buscar(id int) {

}

func (r *Repository) Vender(id int) {

}

func (r *Repository) conectar(dsn string) {
	var err error
	r.Db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println(err)
	}
}
