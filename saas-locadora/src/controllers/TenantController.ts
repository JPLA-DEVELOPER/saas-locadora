import { Request, Response } from 'express';
import { createTenantService } from '../services/tenantService';

export const createTenant = async (req: Request, res: Response) => {
  try {
    const { name, cnpj } = req.body;
    
    // Validação básica
    if (!name || !cnpj) {
      return res.status(400).json({ error: 'Nome e CNPJ são obrigatórios.' });
    }

    const tenant = await createTenantService({ name, cnpj });
    return res.status(201).json(tenant);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar locadora.' });
  }
};