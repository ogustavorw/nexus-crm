import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { $Enums } from '@prisma/client';

export type LeadStatus = $Enums.LeadStatus;

@Entity('leads') // Adicione o nome da tabela aqui
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefone: string;

  @Column()
  origem: string;

  @Column({
    type: 'enum',
    enum: ['novo', 'contatado', 'interessado', 'fechado'],
    default: 'novo'
  })
  status: LeadStatus;

  @Column()
  clienteId: string;
}