import { Controller, Post, Get, Body } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './entities/lead.entity';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.leadService.create(data);
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }
}