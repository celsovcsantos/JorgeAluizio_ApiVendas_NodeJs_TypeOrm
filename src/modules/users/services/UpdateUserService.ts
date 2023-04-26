import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    const userExists = await userRepository.findByEmail(email);
    if (userExists && email != user.email) {
      throw new AppError(`Usuário com o email '${email}' já existe`);
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
