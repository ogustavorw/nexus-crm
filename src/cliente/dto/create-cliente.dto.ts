import {
    IsInt,
    IsString
} from 'class-validator'


export class CreateClienteDto {
    @IsInt()
    telefone: number; // telefone do cliente
    @IsString() 
    nome: string; // nome do cliente
    email: string; // email do cliente

}