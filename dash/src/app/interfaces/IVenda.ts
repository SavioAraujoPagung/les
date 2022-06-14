export interface IProdutoVenda {
    id: number,
    quantidade: number
}

export interface IVenda{
    cliente: number,
    finalizado: boolean;
    produtos: IProdutoVenda[]
}