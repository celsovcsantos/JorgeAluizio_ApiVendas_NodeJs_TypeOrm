import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../users/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import User from '../../users/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
//   token: string;
// }

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Credencial inválida');
    }
    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw new AppError('Credencial inválida');
    }

    const secret = '1e6534cb0e825f77c9ba0a7d5647d6bc'; //retirado do site https://www.md5.cz/ utilizando o string "fdsghdfdfghdfghgfhfghhdfghdfghdfghet5tuuiukjkjhghhxchvbmjhgtdsfhjfghkjhjgfhdghjhfgkghhdfgbstedrtyrtuyrtiytjytuioiuoiuyknnjghjk"
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
