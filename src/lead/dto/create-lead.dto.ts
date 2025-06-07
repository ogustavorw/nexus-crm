import {
    IsString
} from 'class-validator'

export class CreateLeadDto {
    @IsString() 
    nome: string;
    email: string;
    telefone: string;
    origem:string;
    status: string;
    clienteId: string;
}