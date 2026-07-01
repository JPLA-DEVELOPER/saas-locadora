import Tenant from '../models/Tenant';

export const createTenantService = async (data: { name: string, cnpj: string }) => {
  // Regra de negócio
  const tenant = await Tenant.create(data);
  return tenant;
};