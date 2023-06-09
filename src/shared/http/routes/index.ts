import productRouter from '@modules/products/routes/productRoutes';
import sessionRouter from '@modules/sessions/routes/sessionRoutes';
import passwordRouter from '@modules/users/routes/passwordRoutes';
import userRouter from '@modules/users/routes/userRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);

// routes.get('/', (request, response) => {
//   return response.json({ message: 'Hello Dev!' });
// });

export default routes;
