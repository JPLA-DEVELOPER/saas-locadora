import { Request, Response } from 'express';
import Asset from '../models/Asset';

export const createAsset = async (req: Request, res: Response) => {
  try {
    const { serial_number, tenant_id } = req.body;
    const asset = await Asset.create({ serial_number, tenant_id, status: 'disponivel' });
    return res.status(201).json(asset);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar caçamba.' });
  }
};