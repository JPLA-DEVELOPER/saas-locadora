# 🔐 Guia de Autenticação e Autorização

## Visão Geral

O sistema implementa:
- **Autenticação JWT**: Tokens seguros para validação de usuários
- **Multi-tenant isolation**: Dados isolados por locadora (tenant)
- **RBAC (Role-Based Access Control)**: Controle de acesso por roles (admin/user)
- **Criptografia de senha**: Senhas protegidas com bcryptjs

---

## 1️⃣ Fluxo de Registro (Sign Up)

### Endpoint
```
POST /api/auth/register
```

### Request Body
```json
{
  "name": "João Paulo",
  "email": "joao@example.com",
  "password": "senha123",
  "tenant_name": "Locadora ABC",
  "cnpj": "12.345.678/0001-90"
}
```

### Response (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Paulo",
    "email": "joao@example.com",
    "role": "admin",
    "tenant_id": 1
  },
  "tenant": {
    "id": 1,
    "name": "Locadora ABC",
    "cnpj": "12.345.678/0001-90"
  }
}
```

### O que acontece:
1. ✅ Valida dados com Zod
2. ✅ Verifica se email e CNPJ já existem
3. ✅ Cria novo tenant (locadora)
4. ✅ Cria usuário admin criptografando a senha
5. ✅ Gera token JWT válido por 7 dias

---

## 2️⃣ Fluxo de Login

### Endpoint
```
POST /api/auth/login
```

### Request Body
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

### Response (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Paulo",
    "email": "joao@example.com",
    "role": "admin",
    "tenant_id": 1
  }
}
```

### Errors
- **401**: Email ou senha inválidos
- **400**: Dados incompletos

---

## 3️⃣ Usando o Token

Todos os endpoints autenticados requerem o token no header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Exemplo com cURL
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Exemplo com fetch (JavaScript)
```javascript
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

fetch('http://localhost:3000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 4️⃣ Obter Perfil do Usuário

### Endpoint
```
GET /api/auth/profile
```

### Headers
```
Authorization: Bearer YOUR_TOKEN
```

### Response (200 OK)
```json
{
  "user": {
    "id": 1,
    "tenant_id": 1,
    "email": "joao@example.com",
    "role": "admin"
  }
}
```

---

## 5️⃣ Criar Novo Usuário (Admin Only)

### Endpoint
```
POST /api/auth/users
```

### Headers
```
Authorization: Bearer ADMIN_TOKEN
```

### Request Body
```json
{
  "name": "Maria Silva",
  "email": "maria@example.com",
  "password": "senha456",
  "role": "user"
}
```

### Response (201 Created)
```json
{
  "id": 2,
  "name": "Maria Silva",
  "email": "maria@example.com",
  "role": "user",
  "tenant_id": 1
}
```

### Validações
- ✅ Apenas **admins** podem criar usuários
- ✅ Novo usuário é adicionado automaticamente ao **mesmo tenant** (tenant_id)
- ✅ Email deve ser **único** no sistema
- ✅ Role padrão é **"user"** (pode ser "admin" ou "user")

---

## 6️⃣ Alterar Senha

### Endpoint
```
POST /api/auth/change-password
```

### Headers
```
Authorization: Bearer YOUR_TOKEN
```

### Request Body
```json
{
  "oldPassword": "senha123",
  "newPassword": "novaSenha456"
}
```

### Response (200 OK)
```json
{
  "message": "Senha alterada com sucesso"
}
```

### Validações
- ✅ Senha atual deve estar **correta**
- ✅ Nova senha deve ter **no mínimo 6 caracteres**

---

## 🔒 Isolamento de Dados (Multi-tenant)

### Como funciona?

1. **Cada usuário pertence a um tenant**
   ```typescript
   user.tenant_id = 1  // Locadora ABC
   ```

2. **O middleware `tenantIsolationMiddleware` garante isolamento**
   ```typescript
   // Injeta automaticamente o tenant_id do usuário
   req.body.tenant_id = req.user.tenant_id;
   ```

3. **Exemplos de isolamento:**

   ✅ Admin da Locadora A **NÃO** pode criar ativos da Locadora B
   
   ✅ Admin da Locadora A **NÃO** pode ver clientes da Locadora B
   
   ✅ Cada query no banco filtra automaticamente por `tenant_id`

---

## 👥 Roles e Permissões

### Admin
- ✅ Criar novos usuários
- ✅ Gerenciar ativos, clientes e aluguéis
- ✅ Acessar dados do tenant

### User
- ✅ Consultar dados (assets, rentals)
- ❌ Criar usuários
- ❌ Deletar dados críticos

### Exemplo de proteção de role:
```typescript
// Apenas admins podem criar usuários
router.post(
  '/users',
  authMiddleware,              // Valida token
  roleMiddleware(['admin']),   // Valida role
  tenantIsolationMiddleware,   // Isola por tenant
  createUser
);
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=locadora_db
DB_USER=root
DB_PASS=password123

# Server
PORT=3000
NODE_ENV=development

# JWT (IMPORTANTE: Mude em produção!)
JWT_SECRET=sua-chave-super-secreta-aqui
JWT_EXPIRATION=7d
```

⚠️ **NUNCA** commite `.env` com dados sensíveis para o Git!

---

## 🧪 Testando com Insomnia/Postman

### 1. Registrar
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "João",
  "email": "joao@test.com",
  "password": "senha123",
  "tenant_name": "Locadora Teste",
  "cnpj": "12.345.678/0001-90"
}
```

### 2. Copiar o token da resposta
```
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. Usar em outras requisições
```
GET http://localhost:3000/api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🚀 Próximos Passos

1. **Aplicar middleware de auth** em todas as rotas protegidas:
   ```typescript
   router.use(authMiddleware);
   ```

2. **Testar isolamento multi-tenant:**
   - Criar 2 tenants
   - Logar como cada um
   - Verificar se dados estão isolados

3. **Implementar refresh tokens** (opcional):
   - Tokens válidos por curto período
   - Refresh tokens para renovação

4. **Adicionar auditoria** (opcional):
   - Log de quem criou/modificou dados
   - Timestamps em todas as operações

---

## ❌ Erros Comuns

### "Token não fornecido"
- ❌ Esquecer o header `Authorization`
- ✅ Sempre enviar: `Authorization: Bearer TOKEN`

### "Token inválido ou expirado"
- ❌ Token antigo (válido por 7 dias)
- ✅ Fazer login novamente

### "Email já registrado"
- ❌ Email já existe no sistema
- ✅ Usar outro email ou fazer login

### "Permissão insuficiente"
- ❌ Usuário não é admin
- ✅ Pedir ao admin para criar usuário

---

## 📚 Referências

- [JWT (JSON Web Tokens)](https://jwt.io)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Zod Validation](https://zod.dev)

