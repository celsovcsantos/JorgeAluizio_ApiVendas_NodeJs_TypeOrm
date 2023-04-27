import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import User from '../../users/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Credencial inválida');
    }
    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw new AppError('Credencial inválida');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
