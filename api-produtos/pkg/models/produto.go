package models

import "time"

type Venda struct {
	Id               int              `json:"-" gorm:"column:id"`
	Quantidade       int              `json:"-" gorm:"column:quantidade"`
	Criacao          time.Time        `json:"-" gorm:"column:datacriacao"`
	IdCliente        int              `json:"cliente" gorm:"-"`
	ProdutosVendidos []ProdutoVendido `json:"produtos"`
}
type Categoria struct {
	Id        int    `json:"id" gorm:"column:id"`
	Nome      string `json:"nome" gorm:"column:nome"`
	Descricao string `json:"descricao" gorm:"column:descricao"`
}

type Produto struct {
	Id            int     `json:"-" gorm:"column:id"`
	Nome          string  `json:"nome" gorm:"column:nome"`
	CategoriaId   int     `json:"categoria" gorm:"column:id_categoria"`
	CodigoBarra   string  `json:"codigo_barras" gorm:"column:codigo_barra"`
	Rfid          string  `json:"rfid" gorm:"column:rfid"`
	PrecoCusto    float64 `json:"preco_custo" gorm:"column:precocusto"`
	PrecoVenda    float64 `json:"preco_venda" gorm:"column:precovenda"`
	UnidadeMedida string  `json:"unidade_medida" gorm:"column:unidademedida"`
	Quantidade    int     `json:"quantidade" gorm:"column:quantidade"`
}

type ProdutoVendido struct {
	IdProduto  int `json:"idProduto"`
	Quantidade int `json:"quantidade"`
}
