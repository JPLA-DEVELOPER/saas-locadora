import { Request, Response } from 'express';
import Customer from '../models/Customer';

export const createCustomer = async (req: Request, res: Response) => {
  try {
    // tenant_id virá do middleware de segurança no futuro
    const { name, document, phone, tenant_id } = req.body;
    const customer = await Customer.create({ name, document, phone, tenant_id });
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
};