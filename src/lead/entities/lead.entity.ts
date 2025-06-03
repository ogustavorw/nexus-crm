import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  origem: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  clienteId: string;
}