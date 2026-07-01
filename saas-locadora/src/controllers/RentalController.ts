import { Request, Response } from 'express';
import Rental from '../models/Rental';

export const createRental = async (req: Request, res: Response) => {
  try {
    // 1. Recebe os dados do corpo da requisição
    const { tenant_id, customer_id, start_date } = req.body;

    // 2. Validação simples (o ideal é usar bibliotecas como Joi ou Zod)
    if (!tenant_id || !customer_id || !start_date) {
      return res.status(400).json({ error: 'Dados incompletos para criação da locação.' });
    }

    // 3. Cria o registro no banco
    const rental = await Rental.create({
      tenant_id,
      customer_id,
      start_date,
      status: 'pendente'
    });

    // 4. Retorna sucesso
    return res.status(201).json(rental);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao criar locação.' });
  }
};