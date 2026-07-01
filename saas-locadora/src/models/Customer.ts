import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

class Customer extends Model {
  public id!: number;
  public tenant_id!: number;
  public name!: string;
  public document!: string; // CPF ou CNPJ
  public phone!: string;
}

Customer.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  
  // Ligação obrigatória com a Locadora (Tenant)
  // Isso garante que clientes da Locadora A não apareçam para a Locadora B
  tenant_id: { type: DataTypes.INTEGER, allowNull: false },
  
  name: { type: DataTypes.STRING, allowNull: false },
  document: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
}, {
  sequelize,
  modelName: 'Customer',
  tableName: 'customers',
});

// Estabelece o relacionamento
Customer.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasMany(Customer, { foreignKey: 'tenant_id' });

export default Customer;