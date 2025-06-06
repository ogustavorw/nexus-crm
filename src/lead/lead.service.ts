import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeadService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.lead.create({ data });
  }

  async findAll() {
    return this.prisma.lead.findMany();
  }
}