
import { Funcionalidade } from "./Funcionalidade";

export class Usuario {
    id !: number;
    nome!: string;
    cpf!: string;
    senha!: string;
    funcionalidades!: Funcionalidade[];
}