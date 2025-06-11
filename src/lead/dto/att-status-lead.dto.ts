import { IsString, IsIn } from 'class-validator';

export class AtualizarStatusLeadDto {
  @IsString()
  @IsIn(['novo', 'contatado', 'interessado', 'fechado'], {
    message: 'Status inválido',
  })
  status: string;
}