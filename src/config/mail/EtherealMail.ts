import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

interface IReturn {
  erro: boolean;
  mensagemEnviada: string;
  url: string | false;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<IReturn> {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: 'equipe@apivendas.com.br',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    //return `Message sent: ${message.messageId} / Preview URL: ${nodemailer.getTestMessageUrl(message)}`;
    return {
      erro: false,
      mensagemEnviada: message.messageId,
      url: nodemailer.getTestMessageUrl(message),
    };
  }
}
