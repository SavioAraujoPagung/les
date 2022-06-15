export interface IProdutoVenda {
    id: number,
    quantidade: number
}

export interface IVenda {
    finalizado: boolean;
    produtos: IProdutoVenda[]
}

export interface FormDialog{
    qtd: string,
    rfid: string,
}