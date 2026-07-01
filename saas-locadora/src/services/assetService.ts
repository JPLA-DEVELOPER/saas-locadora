import Asset from '../models/Asset';

export const createAssetService = async (data: any) => {
  // Regras de negício
  return await Asset.create({ ...data, status: 'disponivel' });
};