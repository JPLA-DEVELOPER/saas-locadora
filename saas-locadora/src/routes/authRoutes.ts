import { Router } from 'express';
import { register, login, createUser, changePassword, getProfile } from '../controllers/AuthController';
import { authMiddleware, tenantIsolationMiddleware, roleMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nova locadora e usuário admin
 *     description: Cria um novo tenant (locadora) e um usuário administrador
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - tenant_name
 *               - cnpj
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Paulo"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               tenant_name:
 *                 type: string
 *                 example: "Locadora ABC"
 *               cnpj:
 *                 type: string
 *                 example: "12.345.678/0001-90"
 *     responses:
 *       201:
 *         description: Registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login
 *     description: Autentica um usuário e retorna um token JWT
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Email ou senha inválidos
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Obter perfil do usuário
 *     description: Retorna os dados do usuário autenticado
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil
 *       401:
 *         description: Não autenticado
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Alterar senha
 *     description: Altera a senha do usuário autenticado
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "senha123"
 *               newPassword:
 *                 type: string
 *                 example: "novaSenha456"
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Senha inválida
 */
router.post('/change-password', authMiddleware, changePassword);

/**
 * @swagger
 * /api/auth/users:
 *   post:
 *     summary: Criar novo usuário (admin only)
 *     description: Cria um novo usuário no mesmo tenant (apenas admins)
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Maria Silva"
 *               email:
 *                 type: string
 *                 example: "maria@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               role:
 *                 type: string
 *                 enum: ["admin", "user"]
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       403:
 *         description: Apenas admins podem criar usuários
 */
router.post('/users', authMiddleware, roleMiddleware(['admin']), tenantIsolationMiddleware, createUser);

export default router;