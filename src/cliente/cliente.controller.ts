import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateClienteDto: CreateClienteDto) {
    return this.clienteService.create(CreateClienteDto);
  }

  @Get('/nome/:nome')
  async findByNome(@Param('nome') nome: string): Promise<Cliente[]> {
    return this.clienteService.findByNome(nome);
  }

  @Get()
  findAll(
    @Query('nome') nome?: string,
    @Query('email') email?: string,
    @Query('telefone') telefone?: string,
    @Query('sort') sort: 'nome' | 'email' = 'nome',
    @Query('order') order: 'asc' | 'desc' = 'asc'
  ) {
    return this.clienteService.findAll(nome, email, telefone, sort, order);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateClienteDto: UpdateClienteDto,
  ) {
    return this.clienteService.update(id, UpdateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}