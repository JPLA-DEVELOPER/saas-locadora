import { Router } from 'express';
import { createTenant } from '../controllers/TenantController';
import { validateRequest } from '../middlewares/validateRequest';
import { createTenantSchema } from '../schemas/tenantSchema';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';

const router = Router();

/**
 * @swagger
 * /api/tenants:
 *   post:
 *     summary: Criar uma nova locadora
 *     description: Cria um novo tenant (locadora) no sistema
 *     tags:
 *       - Tenants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cnpj
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Locadora ABC Ltda"
 *               cnpj:
 *                 type: string
 *                 example: "12.345.678/0001-90"
 *     responses:
 *       201:
 *         description: Tenant criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Locadora ABC Ltda"
 *                 cnpj:
 *                   type: string
 *                   example: "12.345.678/0001-90"
 *       400:
 *         description: Dados obrigatórios faltando (name, cnpj)
 *       500:
 *         description: Erro ao criar locadora no servidor
 */
router.post('/', validateRequest(createTenantSchema), createTenant);

/**
 * @swagger
 * /api/tenants/{id}:
 *   get:
 *     summary: Obter detalhes de uma locadora
 *     description: Retorna os dados de uma locadora específica pelo ID
 *     tags:
 *       - Tenants
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID da locadora
 *     responses:
 *       200:
 *         description: Dados da locadora encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 cnpj:
 *                   type: string
 *       404:
 *         description: Locadora não encontrada
 */
router.get('/:id', (req, res) => {
  res.json({ message: 'GET tenant by ID - implementar' });
});

export default router;
