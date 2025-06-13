export enum LeadStatus {
  novo = 'novo',
  contatado = 'contatado',
  interessado = 'interessado',
  fechado = 'fechado'
}

export interface Lead {
  id: string;
  nome: string;
  email: string | null;
  telefone: string;
  origem: string | null;
  status: string; // Vai ser validado como LeadStatus
  clienteId: string;
}