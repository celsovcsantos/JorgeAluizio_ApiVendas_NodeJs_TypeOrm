import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

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

passwordRouter.post(
  '/reset',
  celebrate(
    {
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
      },
    },
    {
      abortEarly: false, //valida todos e retorna com todos os erros de uma vez
    },
  ),
  resetPasswordController.create,
);

export default passwordRouter;
