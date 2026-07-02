import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import routes from './routes';

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'SaaS Locadora - API Docs',
}));

// Rota raiz
app.get('/', (req, res) => {
  res.json({ 
    message: 'SaaS Locadora API',
    docs: 'http://localhost:3000/api-docs'
  });
});

// Registra todas as rotas da API
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}/api-docs`);
});
