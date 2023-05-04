import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

interface IResponse {
  erro: boolean;
  mensagemEnviada: string;
  url: string | false;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Usuário não existe.');
    }
    const token = await userTokenRepository.generate(user.id);
    //console.log(token);

    const ret = await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida. Token: ${token?.token}`,
    });

    return ret;
  }
}

export default SendForgotPasswordEmailService;
