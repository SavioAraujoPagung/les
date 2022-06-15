export interface IProdutoVenda {
    idProduto: number,
    quantidade: number,
    preco: number
}

export interface IVenda {
    finalizado: boolean,
    produtos: IProdutoVenda[]
}

export interface FormDialog{
    qtd: number,
    rfid: string
}