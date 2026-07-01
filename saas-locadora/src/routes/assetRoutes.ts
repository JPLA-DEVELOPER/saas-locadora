import { Router } from 'express';
import { createAsset } from '../controllers/AssetController';

import { tenantMiddleware } from '../middlewares/tenantMiddleware';

import { validateRequest } from '../middlewares/validateRequest';
import { createAssetSchema } from '../schemas/assetSchema';

const router = Router();

// 1. Aplica o middleware para TODAS as rotas abaixo de uma vez(rotas que não devem ser protegidas devem vir antes)
router.use(tenantMiddleware);

// Defina os métodos HTTP e o endpoint
router.post('/', validateRequest(createAssetSchema), createAsset);
//EX: router.get('/', listCustomers); 

export default router;