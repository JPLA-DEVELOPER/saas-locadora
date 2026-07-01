import Customer from '../models/Customer';

export const createCustomerService = async (data: any) => {
  // Regra de negócio
  return await Customer.create(data);
};