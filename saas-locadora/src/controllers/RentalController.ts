import { Request, Response } from 'express';
import { createRentalService } from '../services/rentalService';

export const createRental = async (req: Request, res: Response) => {
  try {
    // O controller só passa os dados para o service
    const rental = await createRentalService(req.body);
    return res.status(201).json(rental);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar locação.' });
  }
};