import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from '@prisma/client';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() cliente: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.clienteService.create(cliente);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }
}