import { Router } from 'express';
import { createTenant } from '../controllers/TenantController';

const router = Router();

// Defina os métodos HTTP e o endpoint
router.post('/', createTenant);
//EX: router.get('/', listCustomers); 

export default router;