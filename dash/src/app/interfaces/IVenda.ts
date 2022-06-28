export interface IProdutoVenda {
    idProduto: number,
    rfidProduto: string,
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

export interface IVendaList {
    id_cliente: string,
    rfid_cliente: string,
    quantidade: number,
}