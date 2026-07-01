import { Router } from 'express';
import { createTenant } from '../controllers/TenantController';

import { validateRequest } from '../middlewares/validateRequest';
import { createTenantSchema } from '../schemas/tenantSchema';

import { tenantMiddleware } from '../middlewares/tenantMiddleware';

const router = Router();

// 1. Aplica o middleware para TODAS as rotas abaixo de uma vez(rotas que não devem ser protegidas devem vir antes)
router.use(tenantMiddleware);


// Defina os métodos HTTP e o endpoint
router.post('/', validateRequest(createTenantSchema), createTenant);
//EX: router.get('/', listCustomers); 

export default router;