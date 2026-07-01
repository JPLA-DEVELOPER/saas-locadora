import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Tenant from './Tenant';

class Asset extends Model {
  public id!: number;
  public tenant_id!: number;
  public serial_number!: string;
  public status!: 'disponivel' | 'alugado' | 'manutencao';
}

Asset.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tenant_id: { type: DataTypes.INTEGER, allowNull: false },
  serial_number: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('disponivel', 'alugado', 'manutencao'), defaultValue: 'disponivel' },
}, {
  sequelize,
  modelName: 'Asset',
  tableName: 'assets'
});

Asset.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasMany(Asset, { foreignKey: 'tenant_id' });

export default Asset;