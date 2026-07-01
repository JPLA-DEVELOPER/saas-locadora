import { Router } from 'express';
import { createCustomer } from '../controllers/CustomerController';

const router = Router();

// Defina os métodos HTTP e o endpoint
router.post('/', createCustomer);
//EX: router.get('/', listCustomers); 

export default router;