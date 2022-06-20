export interface IVendaCaixa {
    valorTotal: number,
    produtos:   IProduto[]
}

export interface IProduto {
    id:             number;
    nome:           string;
    categoria:      number;
    rfid:           string;
    preco_venda:    number;
    unidade_medida: string;
    quantidade:     number;
    codigo_barras:  string;
}