import { Request, Response } from 'express';
import Tenant from '../models/Tenant';

export const createTenant = async (req: Request, res: Response) => {
  try {
    const { name, cnpj } = req.body;
    const tenant = await Tenant.create({ name, cnpj });
    return res.status(201).json(tenant);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar locadora.' });
  }
};