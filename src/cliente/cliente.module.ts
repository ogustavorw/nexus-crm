import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { PrismaService } from '../prisma/prisma.service'; // Importe o PrismaService

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, PrismaService], // Adicione PrismaService aqui
})
export class ClienteModule {}