import { Router } from 'express';
import { createAsset } from '../controllers/AssetController';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createAssetSchema } from '../schemas/assetSchema';

const router = Router();

// Aplica middleware de validação de tenant para todas as rotas
router.use(tenantMiddleware);

/**
 * @swagger
 * /api/assets:
 *   post:
 *     summary: Criar um novo ativo (caçamba/container)
 *     description: Registra uma nova caçamba ou container no sistema da locadora
 *     tags:
 *       - Assets
 *     security:
 *       - TenantId: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - status
 *               - license_plate
 *             properties:
 *               type:
 *                 type: string
 *                 enum: ["caçamba", "container", "equipamento"]
 *                 example: "caçamba"
 *               status:
 *                 type: string
 *                 enum: ["disponível", "alugado", "manutenção"]
 *                 example: "disponível"
 *               license_plate:
 *                 type: string
 *                 example: "ABC-1234"
 *               capacity:
 *                 type: number
 *                 example: 3000
 *     responses:
 *       201:
 *         description: Ativo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 type:
 *                   type: string
 *                 status:
 *                   type: string
 *                 license_plate:
 *                   type: string
 *       400:
 *         description: Dados inválidos ou incompletos
 *       403:
 *         description: Tenant não identificado (falta header x-tenant-id)
 *       500:
 *         description: Erro ao criar ativo
 */
router.post('/', validateRequest(createAssetSchema), createAsset);

/**
 * @swagger
 * /api/assets:
 *   get:
 *     summary: Listar todos os ativos da locadora
 *     description: Retorna todos os ativos (caçambas, containers) registrados para a locadora autenticada
 *     tags:
 *       - Assets
 *     security:
 *       - TenantId: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["disponível", "alugado", "manutenção"]
 *         description: Filtrar por status (opcional)
 *     responses:
 *       200:
 *         description: Lista de ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   type:
 *                     type: string
 *                   status:
 *                     type: string
 *                   license_plate:
 *                     type: string
 *       403:
 *         description: Tenant não identificado
 */
router.get('/', (req, res) => {
  res.json({ message: 'GET all assets - implementar' });
});

/**
 * @swagger
 * /api/assets/{id}:
 *   put:
 *     summary: Atualizar status de um ativo
 *     description: Modifica o status de uma caçamba ou container
 *     tags:
 *       - Assets
 *     security:
 *       - TenantId: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID do ativo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["disponível", "alugado", "manutenção"]
 *                 example: "alugado"
 *     responses:
 *       200:
 *         description: Ativo atualizado com sucesso
 *       404:
 *         description: Ativo não encontrado
 *       403:
 *         description: Acesso negado
 */
router.put('/:id', (req, res) => {
  res.json({ message: 'PUT asset - implementar' });
});

/**
 * @swagger
 * /api/assets/{id}:
 *   delete:
 *     summary: Deletar um ativo
 *     description: Remove uma caçamba ou container do sistema
 *     tags:
 *       - Assets
 *     security:
 *       - TenantId: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID do ativo a deletar
 *     responses:
 *       204:
 *         description: Ativo deletado com sucesso
 *       404:
 *         description: Ativo não encontrado
 *       403:
 *         description: Acesso negado
 */
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE asset - implementar' });
});

export default router;
