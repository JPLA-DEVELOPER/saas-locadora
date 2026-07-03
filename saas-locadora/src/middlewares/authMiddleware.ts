import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    tenant_id: number;
    email: string;
    role: 'admin' | 'user';
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const secret = process.env.JWT_SECRET || 'seu-secret-key';
    const decoded = jwt.verify(token, secret) as any;

    req.user = {
      id: decoded.id,
      tenant_id: decoded.tenant_id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

export const tenantIsolationMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Valida se o tenant_id da requisição bate com o do token
    const requestTenantId = req.body.tenant_id || req.query.tenant_id;
    
    if (requestTenantId && parseInt(requestTenantId) !== req.user.tenant_id) {
      return res.status(403).json({ error: 'Acesso negado a este tenant' });
    }

    // Injeta automaticamente o tenant_id
    req.body.tenant_id = req.user.tenant_id;

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao validar tenant' });
  }
};

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permissão insuficiente' });
    }

    next();
  };
};