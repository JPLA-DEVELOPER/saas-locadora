import { z } from 'zod';

export const createTenantSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cnpj: z.string().length(14, "O CNPJ deve ter 14 dígitos")
});