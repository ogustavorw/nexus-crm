import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';


@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) { }

  private mapToEntity(lead: any): Lead {
    return {
      id: lead.id,
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      origem: lead.origem,
      status: lead.status,
      clienteId: lead.clienteId
    };
  }

  async create(CreateLeadDto: CreateLeadDto): Promise<Lead> {
    return await this.prisma.lead.create({
      data: {
        nome: CreateLeadDto.nome,
        email: CreateLeadDto.email,
        telefone: CreateLeadDto.telefone,
        origem: CreateLeadDto.origem,
        status: CreateLeadDto.status,
        clienteId: CreateLeadDto.clienteId
      }
    })
  }

  async findAll(
    nome?: string,
    email?: string,
    telefone?: string,
    sort: 'nome' | 'email' = 'nome',
    order: 'asc' | 'desc' = 'asc'
  ): Promise<Lead[]> {
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

    const lead = await this.prisma.lead.findMany({
      where,
      orderBy: {
        [sort]: order,
      },
    });

    return lead.map(lead => this.mapToEntity(lead));
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
    });
    return this.mapToEntity(lead);
  }

  async update(id: string, UpdateLeadDto: UpdateLeadDto): Promise<Lead> {
    const updatedLead = await this.prisma.lead.update({
      where: { id },
      data: UpdateLeadDto,
    });
    return this.mapToEntity(updatedLead);
  }

  async remove(id: string): Promise<Lead> {
    const deletedLead = await this.prisma.lead.delete({
      where: { id },
    });
    return this.mapToEntity(deletedLead);
  }
}