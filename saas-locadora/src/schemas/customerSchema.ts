import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().min(3, "Nome do cliente é obrigatório"),
  document: z.string().min(11, "Documento deve ter pelo menos 11 dígitos (CPF/CNPJ)"),
  phone: z.string().optional(), // Opcional
  tenant_id: z.number().int("ID do Tenant inválido")
});