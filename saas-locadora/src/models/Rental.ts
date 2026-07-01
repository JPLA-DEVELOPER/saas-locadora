import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

class Rental extends Model {
  public id!: number;
  public tenant_id!: number;
  public customer_id!: number;
  public start_date!: Date;
  public end_date!: Date;
  public status!: 'pendente' | 'ativa' | 'concluida' | 'cancelada';
}

Rental.init({
  // Auto-incremento cuida da chave primária
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  
  // Chave estrangeira que garante isolamento do Tenant
  tenant_id: { type: DataTypes.INTEGER, allowNull: false },
  
  // ID do cliente
  customer_id: { type: DataTypes.INTEGER, allowNull: false },
  
  start_date: { type: DataTypes.DATE, allowNull: false },
  end_date: { type: DataTypes.DATE, allowNull: true }, // Pode ser nulo se a locação for aberta
  
  status: { 
    type: DataTypes.ENUM('pendente', 'ativa', 'concluida', 'cancelada'), 
    defaultValue: 'pendente' 
  },
}, {
  sequelize,
  modelName: 'Rental',
  tableName: 'rentals',
  // O "paranoid" permite o soft-delete (ao invés de apagar, ele apenas marca como excluído)
  paranoid: true, 
});

// Define a relação de pertencer a uma empresa (Tenant)
Rental.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasMany(Rental, { foreignKey: 'tenant_id' });

export default Rental;