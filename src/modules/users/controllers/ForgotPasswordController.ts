import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotPasswortdEmail = new SendForgotPasswordEmailService();
    await sendForgotPasswortdEmail.execute({ email });
    return res.status(204).json();
  }
}
