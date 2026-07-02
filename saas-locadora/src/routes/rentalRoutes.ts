import { Router } from 'express';
import { createRental } from '../controllers/RentalController';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createRentalSchema } from '../schemas/rentalSchema';

const router = Router();

router.use(tenantMiddleware);

/**
 * @swagger
 * /api/rentals:
 *   post:
 *     summary: Criar uma nova locação
 *     description: Registra um novo contrato de locação entre cliente e ativo
 *     tags:
 *       - Rentals
 *     security:
 *       - TenantId: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - asset_id
 *               - start_date
 *               - end_date
 *               - daily_rate
 *             properties:
 *               customer_id:
 *                 type: number
 *                 example: 1
 *               asset_id:
 *                 type: number
 *                 example: 1
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-05"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-15"
 *               daily_rate:
 *                 type: number
 *                 format: float
 *                 example: 150.00
 *               notes:
 *                 type: string
 *                 example: "Cliente preferencial"
 *     responses:
 *       201:
 *         description: Locação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 customer_id:
 *                   type: number
 *                 asset_id:
 *                   type: number
 *                 status:
 *                   type: string
 *                   example: "ativa"
 *                 total_amount:
 *                   type: number
 *       400:
 *         description: Dados inválidos ou cliente/ativo não encontrado
 *       403:
 *         description: Tenant não identificado
 */
router.post('/', validateRequest(createRentalSchema), createRental);

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Listar todas as locações
 *     description: Retorna todas as locações (ativas, concluídas) da locadora
 *     tags:
 *       - Rentals
 *     security:
 *       - TenantId: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["ativa", "concluída", "cancelada"]
 *         description: Filtrar por status (opcional)
 *     responses:
 *       200:
 *         description: Lista de locações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   customer_id:
 *                     type: number
 *                   asset_id:
 *                     type: number
 *                   status:
 *                     type: string
 *                   total_amount:
 *                     type: number
 */
router.get('/', (req, res) => {
  res.json({ message: 'GET all rentals - implementar' });
});

/**
 * @swagger
 * /api/rentals/{id}:
 *   patch:
 *     summary: Finalizar uma locação
 *     description: Marca uma locação como concluída e calcula o total final
 *     tags:
 *       - Rentals
 *     security:
 *       - TenantId: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID da locação
 *     responses:
 *       200:
 *         description: Locação finalizada com sucesso
 *       404:
 *         description: Locação não encontrada
 */
router.patch('/:id/complete', (req, res) => {
  res.json({ message: 'PATCH rental complete - implementar' });
});

export default router;
