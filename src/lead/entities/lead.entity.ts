import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
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

  @Column()
  status: string;

  @Column()
  clienteId: string;
}