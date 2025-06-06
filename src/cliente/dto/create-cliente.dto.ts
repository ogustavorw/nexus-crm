import {
    IsString
} from 'class-validator'


export class CreateClienteDto {
    @IsString() 
    nome: string; // nome do cliente
    email: string; // email do cliente
    telefone: string; // telefone do cliente

}