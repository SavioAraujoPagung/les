
import { Funcionalidade } from "./Funcionalidade";

export class Usuario {
    //id !: number;
    nome!: string;
    senha!: string;
    cpf!: string;
    datacriacao!: string;
    funcionalidadeList!: Funcionalidade[];
}