import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SaaS Locadora API',
      version: '1.0.0',
      description: 'API robusta para gestão de locações de caçambas, containers e equipamentos',
      contact: {
        name: 'João Paulo Lima',
        url: 'https://www.linkedin.com/in/jpladeveloper',
        email: 'joao@example.com',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
      {
        url: 'https://api.example.com',
        description: 'Servidor de Produção',
      },
    ],
    components: {
      securitySchemes: {
        TenantId: {
          type: 'apiKey',
          in: 'header',
          name: 'x-tenant-id',
          description: 'ID da locadora (Tenant) que deve ser enviado em cada requisição',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);
