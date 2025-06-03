import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cliente } from '@prisma/client';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.prisma.cliente.create({ data });
  }

  async findAll() {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: string) {
    return this.prisma.cliente.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Cliente>) {
    return this.prisma.cliente.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.cliente.delete({ where: { id } });
  }
}