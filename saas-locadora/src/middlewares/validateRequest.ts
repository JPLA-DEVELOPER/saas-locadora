import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      // Retorna os erros de forma organizada
      return res.status(400).json({ errors: result.error.errors });
    }
    
    next(); // Se passar, segue para o próximo passo
  };
};