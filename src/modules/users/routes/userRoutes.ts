import { Router } from 'express';
import UserController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.index);

userRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.show,
);

userRouter.post(
  '/',
  // celebrate(
  //   {
  //     body: Joi.object().keys({
  //       name: Joi.string().required(),
  //       email: Joi.string().email().required(),
  //       password: Joi.string().required(),
  //     }),
  //   },
  //   {
  //     abortEarly: false, //valida todos e retorna com todos os erros de uma vez
  //   },
  // ),
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
    {
      abortEarly: false, //valida todos e retorna com todos os erros de uma vez
    },
  ),
  userController.create,
);

userRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.update,
);

userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.delete,
);

export default userRouter;
