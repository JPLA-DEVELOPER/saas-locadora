import { Request, Response } from 'express';
import { createAssetService } from '../services/assetService';

export const createAsset = async (req: Request, res: Response) => {
  try {
    const asset = await createAssetService(req.body);
    return res.status(201).json(asset);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar ativo.' });
  }
};