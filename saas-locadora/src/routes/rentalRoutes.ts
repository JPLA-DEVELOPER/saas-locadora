import { Router } from 'express';
import { createRental } from '../controllers/RentalController';

const router = Router();

// Defina os métodos HTTP e o endpoint
router.post('/', createRental);
//EX: router.get('/', listCustomers); 

export default router;