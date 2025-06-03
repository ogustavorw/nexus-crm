import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query'], // Ative logs de consulta (opcional)
    });
  }

  async onModuleInit() {
    await this.$connect(); // Conecta ao banco de dados quando o módulo é iniciado
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Desconecta do banco de dados quando o módulo é destruído
  }
}