import { z } from 'zod';

export const createAssetSchema = z.object({
  serial_number: z.string().min(1, "Número de série é obrigatório"),
  tenant_id: z.number().int("ID do Tenant inválido")
});