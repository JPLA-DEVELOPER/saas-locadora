import { Router } from 'express';
import { createCustomer } from '../controllers/CustomerController';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { createCustomerSchema } from '../schemas/customerSchema';

const router = Router();

router.use(tenantMiddleware);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Criar um novo cliente
 *     description: Registra um novo cliente (pessoa física ou jurídica) na locadora
 *     tags:
 *       - Customers
 *     security:
 *       - TenantId: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - document
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@example.com"
 *               phone:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *               document:
 *                 type: string
 *                 description: CPF ou CNPJ
 *                 example: "123.456.789-00"
 *               address:
 *                 type: string
 *                 example: "Rua das Flores, 123"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *       400:
 *         description: Dados inválidos ou incompletos
 *       403:
 *         description: Tenant não identificado
 */
router.post('/', validateRequest(createCustomerSchema), createCustomer);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Listar todos os clientes
 *     description: Retorna lista de clientes da locadora autenticada
 *     tags:
 *       - Customers
 *     security:
 *       - TenantId: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nome ou email (opcional)
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 */
router.get('/', (req, res) => {
  res.json({ message: 'GET all customers - implementar' });
});

export default router;
