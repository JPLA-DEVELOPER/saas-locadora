import sequelize from './config/database';
import Tenant from './models/Tenant';

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // O force: true limpa as tabelas a cada reinício
    console.log('✅ Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
  } finally {
    process.exit();
  }
}

syncDatabase(); 