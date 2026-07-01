import { Request, Response } from 'express';
import { createCustomerService } from '../services/customerService';

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await createCustomerService(req.body);
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
};