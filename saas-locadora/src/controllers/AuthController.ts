import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { registerAuthService, loginAuthService, createUserService, changePasswordService } from '../services/authService';
import { registerSchema, loginSchema, createUserSchema } from '../schemas/authSchema';
import { ZodError } from 'zod';

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const result = await registerAuthService(validatedData);
    return res.status(201).json(result);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginAuthService(validatedData);
    return res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(401).json({ error: error.message });
  }
};

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Apenas admins podem criar usuários
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Apenas admins podem criar usuários' });
    }

    const validatedData = createUserSchema.parse({
      ...req.body,
      tenant_id: req.user.tenant_id,
    });

    const result = await createUserService(validatedData);
    return res.status(201).json(result);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Senha antiga e nova são obrigatórias' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Nova senha deve ter ao menos 6 caracteres' });
    }

    const result = await changePasswordService(req.user.id, oldPassword, newPassword);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    return res.status(200).json({
      user: req.user,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};