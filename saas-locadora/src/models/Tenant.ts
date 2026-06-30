import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Tenant extends Model {
  public id!: number;
  public name!: string;
  public cnpj!: string;
}

Tenant.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primary key: true },
  name: { type: DataTypes.STRING, allowNull: false },
  cnpj: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  sequelize,
  modelName: 'Tenant',
  tableName: 'tenants'
});

export default Tenant;