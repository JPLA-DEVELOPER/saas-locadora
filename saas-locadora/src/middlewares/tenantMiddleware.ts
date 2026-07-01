import { Request, Response, NextFunction } from 'express';
import Tenant from '../models/Tenant';

export const tenantMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // O cliente envia o ID da locadora no header da requisição
  const tenantId = req.headers['x-tenant-id'];

  if (!tenantId) {
    return res.status(403).json({ error: 'Tenant (Locadora) não identificado.' });
  }

  try {
    // Verifica se a locadora existe no banco de dados
    const tenant = await Tenant.findByPk(tenantId as string);
    
    if (!tenant) {
      return res.status(404).json({ error: 'Locadora não encontrada.' });
    }

    // Adicionamos o tenantId ao objeto request para usar nos controllers
    req.body.tenant_id = tenantId;
    
    next(); // Permite que a requisição siga para o Controller
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao validar o Tenant.' });
  }
};