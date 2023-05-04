import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import authConfig from '@config/auth';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('Token informado não existe.');
    }

    const user = await userRepository.findById(userToken.userId);
    if (!user) {
      throw new AppError('Usuário não existe.');
    }

    const dataCriacaoToken = userToken.created_at;
    const compareDate = addHours(dataCriacaoToken, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado.');
    }

    user.password = await hash(password, authConfig.jwt.qtdCaracteresHash);

    await userRepository.save(user);
  }
}

export default ResetPasswordService;
