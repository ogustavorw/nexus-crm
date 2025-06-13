import { Lead } from '../entities/lead.entity';
import { LeadStatus } from '../entities/lead.entity';

export interface LeadStatusMap {
  [LeadStatus.novo]: Lead[];
  [LeadStatus.contatado]: Lead[];
  [LeadStatus.interessado]: Lead[];
  [LeadStatus.fechado]: Lead[];
}