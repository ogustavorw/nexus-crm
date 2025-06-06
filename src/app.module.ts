import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClienteModule } from './cliente/cliente.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [ClienteModule, LeadModule],
  providers: [PrismaService],
})
export class AppModule {}