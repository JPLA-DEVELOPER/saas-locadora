import sequelize from './config/database';

//Importando os models(A ordem importa)
import Tenant from './models/Tenant';
import Customer from './models/Customer';
import Asset from './models/Asset';
import Rental from './models/Rental';

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