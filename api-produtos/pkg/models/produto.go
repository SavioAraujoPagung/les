package models

import (
	"time"
)

type Venda struct {
	ID               int            `json:"-" gorm:"column:id;primaryKey"`
	Quantidade       int            `json:"-" gorm:"column:quantidade"`
	Criacao          time.Time      `json:"-" gorm:"column:datacriacao"`
	ClienteID        int            `json:"cliente" gorm:"column:id_cliente"`
	ProdutosVendidos []ProdutoVenda `json:"produtos"gorm:"-"`
}

type Categoria struct {
	ID        int    `json:"id" gorm:"column:id"`
	Nome      string `json:"nome" gorm:"column:nome"`
	Descricao string `json:"descricao" gorm:"column:descricao"`
}

type Produto struct {
	ID            int     `json:"id" gorm:"column:id"`
	Nome          string  `json:"nome" gorm:"column:nome"`
	CategoriaID   int     `json:"categoria" gorm:"column:id_categoria"`
	CodigoBarra   string  `json:"codigo_barras" gorm:"column:codigo_barra"`
	Rfid          string  `json:"rfid" gorm:"column:rfid"`
	PrecoCusto    float64 `json:"preco_custo" gorm:"column:precocusto"`
	PrecoVenda    float64 `json:"preco_venda" gorm:"column:precovenda"`
	UnidadeMedida string  `json:"unidade_medida" gorm:"column:unidademedida"`
	Quantidade    int     `json:"quantidade" gorm:"column:quantidade"`
}

type ProdutoVenda struct {
	VendaID    int     `json:"-"`//;foreignKey:venda_id;references:vendas"`
	ProdutoID  int     `json:"idProduto" gorm:"column:id_produto"`
	Quantidade int     `json:"quantidade" gorm:"column:quantidade_item"`
	Preco      float64 `json:"preco" gorm:"column:preco"`
}
