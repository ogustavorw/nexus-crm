import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) { }

  private mapToEntity(cliente: any): Cliente {
    return {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
    };
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    return await this.prisma.cliente.create({
      data: {
        nome: createClienteDto.nome,
        email: createClienteDto.email,
        telefone: createClienteDto.telefone
      }
    })
  }

  async findAll(
    nome?: string,
    email?: string,
    telefone?: string,
    sort: 'nome' | 'email' = 'nome',
    order: 'asc' | 'desc' = 'asc'
  ): Promise<Cliente[]> {
    const where: any = {};

    if (nome) {
      where.nome = {
        contains: nome,
        mode: 'insensitive',
      };
    }

    if (email) {
      where.email = {
        equals: email,
        mode: 'insensitive',
      };
    }

    if (telefone) {
      where.telefone = {
        contains: String(telefone),
        mode: 'insensitive',
      };
    }

    const client = await this.prisma.cliente.findMany({
      where,
      orderBy: {
        [sort]: order,
      },
    });

    return client.map(cliente => this.mapToEntity(cliente));
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });
    return this.mapToEntity(cliente);
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const updatedCliente = await this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
    return this.mapToEntity(updatedCliente);
  }

  async remove(id: string): Promise<Cliente> {
    const deletedCliente = await this.prisma.cliente.delete({
      where: { id },
    });
    return this.mapToEntity(deletedCliente);
  }
}