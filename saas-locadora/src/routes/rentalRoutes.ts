import { Router } from 'express';
import { createRental } from '../controllers/RentalController';

import { tenantMiddleware } from '../middlewares/tenantMiddleware';

import { validateRequest } from '../middlewares/validateRequest';
import { createRentalSchema } from '../schemas/rentalSchema';

const router = Router();

// 1. Aplica o middleware para TODAS as rotas abaixo de uma vez(rotas que não devem ser protegidas devem vir antes)
router.use(tenantMiddleware);

// Defina os métodos HTTP e o endpoint
router.post('/', validateRequest(createRentalSchema),  createRental);
//EX: router.get('/', listCustomers); 

export default router;