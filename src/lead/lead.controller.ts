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
import { LeadService } from './lead.service';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import { AtualizarStatusLeadDto } from './dto/att-status-lead.dto';


@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() CreateLeadDto: CreateLeadDto) {
    return this.leadService.create(CreateLeadDto);
  }

  @Get()
  findAll(
    @Query('nome') nome?: string,
    @Query('email') email?: string,
    @Query('telefone') telefone?: string,
    @Query('sort') sort: 'nome' | 'email' = 'nome',
    @Query('order') order: 'asc' | 'desc' = 'asc'
  ) {
    return this.leadService.findAll(nome, email, telefone, sort, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateLeadDto: UpdateLeadDto,
  ) {
    return this.leadService.update(id, UpdateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(id);
  }

  @Patch(':id/status')
  @HttpCode(204)
  async atualizarStatus(
    @Param('id') id: string,
    @Body() dto: AtualizarStatusLeadDto
  ) {
    await this.leadService.atualizarStatus(id, dto.status);
  }
}