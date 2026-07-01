import express from 'express';
import routes from './routes'; // Importa o index.ts de rotas

const app = express();

// Middleware para entender JSON nas requisições
app.use(express.json());

// Registra todas as rotas da API
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});