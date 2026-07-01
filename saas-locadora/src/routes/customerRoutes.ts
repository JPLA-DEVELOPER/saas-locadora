import { Router } from 'express';
import { createCustomer } from '../controllers/CustomerController';


import { tenantMiddleware } from '../middlewares/tenantMiddleware';

import { validateRequest } from '../middlewares/validateRequest';
import { createCustomerSchema } from '../schemas/customerSchema';

const router = Router();

// 1. Aplica o middleware para TODAS as rotas abaixo de uma vez(rotas que não devem ser protegidas devem vir antes)
router.use(tenantMiddleware);

// Defina os métodos HTTP e o endpoint
router.post('/', validateRequest(createCustomerSchema), createCustomer);
//EX: router.get('/', listCustomers); 

export default router;