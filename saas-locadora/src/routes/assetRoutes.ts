import { Router } from 'express';
import { createAsset } from '../controllers/AssetController';

const router = Router();

// Defina os métodos HTTP e o endpoint
router.post('/', createAsset);
//EX: router.get('/', listCustomers); 

export default router;