import { IsString, IsEmail, IsIn } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  nome: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsString()
  origem: string;

  @IsIn(['novo', 'contatado', 'interessado', 'fechado'])
  status: 'novo' | 'contatado' | 'interessado' | 'fechado';

  @IsString({ each: true })
  clienteId?: string; // Agora é opcional
}