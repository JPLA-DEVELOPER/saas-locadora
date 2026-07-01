import { z } from 'zod';

export const createRentalSchema = z.object({
  tenant_id: z.number().int(),
  customer_id: z.number().int(),
  start_date: z.string().datetime("Formato de data inválido (ISO 8601)"),
  status: z.enum(['pendente', 'ativa', 'finalizada']).default('pendente')
});