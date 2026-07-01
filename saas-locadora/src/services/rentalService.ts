import Rental from '../models/Rental';

export const createRentalService = async (data: any) => {
  // Regras de negócio
  
  const rental = await Rental.create(data);
  return rental;
};