import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Tenant from '../models/Tenant';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  tenant_name: string;
  cnpj: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerAuthService = async (data: RegisterPayload) => {
  try {
    // Verifica se user já existe
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('Email já registrado');
    }

    // Verifica se tenant (CNPJ) já existe
    const existingTenant = await Tenant.findOne({ where: { cnpj: data.cnpj } });
    if (existingTenant) {
      throw new Error('CNPJ já registrado');
    }

    // Cria o tenant
    const tenant = await Tenant.create({
      name: data.tenant_name,
      cnpj: data.cnpj,
    });

    // Hash da senha
    const hashedPassword = await bcryptjs.hash(data.password, 10);

    // Cria o usuário admin
    const user = await User.create({
      name: data.name,
      email: data.email,
      password_hash: hashedPassword,
      role: 'admin',
      tenant_id: tenant.id,
    });

    // Gera token JWT
    const secret = process.env.JWT_SECRET || 'seu-secret-key';
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        tenant_id: user.tenant_id,
        role: user.role,
      },
      secret,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenant_id: user.tenant_id,
      },
      tenant: {
        id: tenant.id,
        name: tenant.name,
        cnpj: tenant.cnpj,
      },
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao registrar');
  }
};

export const loginAuthService = async (data: LoginPayload) => {
  try {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    // Verifica a senha
    const isPasswordValid = await bcryptjs.compare(data.password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Email ou senha inválidos');
    }

    // Gera token JWT
    const secret = process.env.JWT_SECRET || 'seu-secret-key';
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        tenant_id: user.tenant_id,
        role: user.role,
      },
      secret,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenant_id: user.tenant_id,
      },
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer login');
  }
};

export const createUserService = async (data: any) => {
  try {
    // Verifica se user já existe
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('Email já registrado');
    }

    // Hash da senha
    const hashedPassword = await bcryptjs.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password_hash: hashedPassword,
      role: data.role || 'user',
      tenant_id: data.tenant_id,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenant_id: user.tenant_id,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar usuário');
  }
};

export const changePasswordService = async (userId: number, oldPassword: string, newPassword: string) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica a senha antiga
    const isPasswordValid = await bcryptjs.compare(oldPassword, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Senha atual inválida');
    }

    // Hash da nova senha
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await user.update({ password_hash: hashedPassword });

    return { message: 'Senha alterada com sucesso' };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao alterar senha');
  }
};