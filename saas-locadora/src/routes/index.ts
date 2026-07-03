import { Router } from 'express';

//importa as rotas
import authRoutes from './authRoutes';
import assetRoutes from './assetRoutes';
import tenantRoutes from './tenantRoutes';
import customerRoutes from './customerRoutes';
import rentalRoutes from './rentalRoutes';

const routes = Router();

//Utiliza as rotas
routes.use('/auth', authRoutes);
routes.use('/assets', assetRoutes);
routes.use('/tenants', tenantRoutes);
routes.use('/customers', customerRoutes);
routes.use('/rentals', rentalRoutes);

export default routes;