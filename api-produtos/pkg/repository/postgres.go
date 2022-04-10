package repository

import (
	"time"

	"github.com/SavioAraujoPagung/les/pkg/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func (r *Repository) Inserir(produto *models.Produto) error {
	return r.db.Create(produto).Error
}

func (r *Repository) Listar(categoria int) ([]models.Produto, error) {
	var err error
	var produtos []models.Produto

	err = r.db.Where("id_categoria = ?", categoria).Find(&produtos).Error

	return produtos, err
}

func (r *Repository) Buscar(id int) (*models.Produto, error) {
	var produto models.Produto
	err := r.db.Where(&models.Produto{ID: id}).First(&produto).Error
	return &produto, err
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
		return false, err
	}

	if permissao.Usuario == idUsuario {
		return true, err
	}
	return false, err
}

func (r *Repository) Vender(venda models.Venda) error {
	produto, err := r.Buscar(venda.ProdutosVendidos[0].ProdutoID)
	if err != nil {
		return err
	}
	qtd := produto.Quantidade
	qtdVendido := venda.ProdutosVendidos[0].Quantidade
	quantidade := qtd - qtdVendido

	err = r.db.Where("id = ?", venda.ProdutosVendidos[0].ProdutoID).Updates(&models.Produto{Quantidade: quantidade}).Error
	return err
}

func (r *Repository) Vendas(produto []models.ProdutoVendido, id int) error {
	venda := &models.Venda{
		Quantidade:       len(produto),
		Criacao:          time.Now(),
		//ProdutosVendidos: produto,
	}

	return r.db.Create(venda).Error

}
