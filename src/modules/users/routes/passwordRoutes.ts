import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    },
    {
      abortEarly: false, //valida todos e retorna com todos os erros de uma vez
    },
  ),
  forgotPasswordController.create,
);

export default passwordRouter;
