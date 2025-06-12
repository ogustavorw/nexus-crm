import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead, LeadStatus } from './entities/lead.entity';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(lead: any): Lead {
    return {
      id: lead.id,
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      origem: lead.origem,
      status: lead.status as LeadStatus,
      clienteId: lead.clienteId,
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
    });
  }

  async findAll(
    nome?: string,
    email?: string,
    telefone?: string,
    sort: 'nome' | 'email' = 'nome',
    order: 'asc' | 'desc' = 'asc',
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

    const leads = await this.prisma.lead.findMany({
      where,
      orderBy: {
        [sort]: order,
      },
    });

    return leads.map((lead) => this.mapToEntity(lead));
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    return this.mapToEntity(lead);
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const updatedLead = await this.prisma.lead.update({
      where: { id },
      data: updateLeadDto,
    });
    return this.mapToEntity(updatedLead);
  }

  async remove(id: string): Promise<Lead> {
    const deletedLead = await this.prisma.lead.delete({ where: { id } });
    return this.mapToEntity(deletedLead);
  }

  async atualizarStatus(id: string, status: LeadStatus): Promise<Lead> {
    const leadAtualizado = await this.prisma.lead.update({
      where: { id },
      data: { status },
    });
    return this.mapToEntity(leadAtualizado);
  }

  async getLeadsPorStatus(): Promise<{
    novo: Lead[];
    contatado: Lead[];
    interessado: Lead[];
    fechado: Lead[];
  }> {
    const todosLeads = await this.prisma.lead.findMany();

    const leadsAgrupados: Record<LeadStatus, Lead[]> = {
      novo: [],
      contatado: [],
      interessado: [],
      fechado: []
    };

    for (const lead of todosLeads) {
      const status = lead.status as LeadStatus;

      if (status in leadsAgrupados) {
        leadsAgrupados[status].push(this.mapToEntity(lead));
      } else {
        console.warn(`Status desconhecido: ${status}`);
      }
    }

    return leadsAgrupados;
  }
}