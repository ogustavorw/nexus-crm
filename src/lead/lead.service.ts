import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead, LeadStatus } from './entities/lead.entity';
import { LeadStatusMap } from './types/lead-status-map.interface';


@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) { }

  private mapToEntity(lead: any): Lead | null {
    if (!lead) return null;

    return {
      id: lead.id,
      nome: lead.nome,
      email: lead.email || null,
      telefone: lead.telefone,
      origem: lead.origem || null,
      status: lead.status,
      clienteId: lead.clienteId
    };
  }

  async create(CreateLeadDto: CreateLeadDto): Promise<Lead> {
    const createdLead = await this.prisma.lead.create({
      data: {
        nome: CreateLeadDto.nome,
        email: CreateLeadDto.email,
        telefone: CreateLeadDto.telefone,
        origem: CreateLeadDto.origem,
        status: CreateLeadDto.status,
        clienteId: CreateLeadDto.clienteId
      }
    });

    const result = this.mapToEntity(createdLead);
    if (!result) {
      throw new Error('Falha ao criar lead');
    }
    return result;
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

    const leads = await this.prisma.lead.findMany({ where });
    return leads
      .map(this.mapToEntity)
      .filter((lead): lead is Lead => lead !== null);
  }

  async findOne(id: string): Promise<Lead | null> {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    return this.mapToEntity(lead);
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const updatedLead = await this.prisma.lead.update({
      where: { id },
      data: updateLeadDto,
    });

    const result = this.mapToEntity(updatedLead);
    if (!result) {
      throw new Error('Falha ao atualizar lead');
    }
    return result;
  }

  async remove(id: string): Promise<Lead> {
    const deletedLead = await this.prisma.lead.delete({ where: { id } });
    const result = this.mapToEntity(deletedLead);
    if (!result) {
      throw new Error('Falha ao excluir lead');
    }
    return result;
  }

  async atualizarStatus(id: string, status: LeadStatus): Promise<Lead> {
    const leadAtualizado = await this.prisma.lead.update({
      where: { id },
      data: { status },
    });

    const result = this.mapToEntity(leadAtualizado);
    if (!result) {
      throw new Error('Falha ao atualizar status do lead');
    }
    return result;
  }

  async getLeadsPorStatus(): Promise<LeadStatusMap> {
    const todosLeads = await this.prisma.lead.findMany();

    const leadsAgrupados: LeadStatusMap = {
      novo: [],
      contatado: [],
      interessado: [],
      fechado: []
    };

    for (const lead of todosLeads) {
      const mappedLead = this.mapToEntity(lead);
      if (!mappedLead) continue;

      const status = mappedLead.status;

      // Garante que o status é válido
      if (Object.values(LeadStatus).includes(status as LeadStatus)) {
        leadsAgrupados[status as keyof LeadStatusMap].push(mappedLead);
      } else {
        console.warn(`Status desconhecido: ${status}`);
      }
    }

    return leadsAgrupados;
  }
}