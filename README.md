🚀 [SaaS para Locadora]
<img width="734" height="377" alt="Captura de tela de 2026-07-01 21-17-06" src="https://github.com/user-attachments/assets/ad8eaccc-b2a2-4e87-9d2a-3f7cec6b9b45" />

Bem-vindo!

Esta é uma solução SaaS (Software as a Service) robusta voltada para a gestão inteligente de locações e ativos (caçambas, containers e equipamentos).

O sistema foi desenhado com foco em escalabilidade, isolamento de dados e manutenibilidade, utilizando as melhores práticas do mercado de desenvolvimento back-end.

🛠 Tecnologias e Ferramentas:
Linguagem: TypeScript

Runtime: Node.js

Framework: Express

Validação: Zod

Banco de Dados: MySQL

Arquitetura: MVC (Layered Architecture)

Modelagem: DBML

🏗 Arquitetura do Projeto:
O sistema foi estruturado em camadas para garantir baixo acoplamento e alta coesão:

Controllers: Camada responsável por receber as requisições HTTP e retornar respostas.

Services: Onde reside a "regra de negócio". É aqui que a mágica acontece, isolando a lógica do banco de dados e regras complexas.

Middlewares: Camada de segurança e processamento, incluindo o isolamento de dados por Tenant (Multi-tenant).

Schemas (Zod): Camada de validação de dados, garantindo que nenhum dado malformado chegue ao banco.

Models: Representação das entidades no banco de dados.

📊 Modelagem de Dados:
O projeto utiliza uma estrutura Multi-tenant, onde todos os registros são vinculados a um tenant_id, garantindo que os dados de um cliente nunca sejam expostos a outro.


💡 Funcionalidades Principais:
✅ Isolamento Multi-tenant: Segurança garantida entre locadoras.

✅ Validação de Dados: Schemas robustos utilizando Zod.

✅ Gestão de Ativos: Controle total de status (disponível, alugado, em manutenção).

✅ Fluxo de Locação: Criação de contratos, itens da locação e controle financeiro.

👨‍💻 Autor
Feito por João Paulo Lima de Albuquerque.

[LinkedIn](https://www.linkedin.com/in/jpladeveloper)

[GitHub] (https://github.com/JPLA-DEVELOPER)
