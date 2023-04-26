import productRouter from '@modules/products/routes/productRoutes';
import userRouter from '@modules/users/routes/userRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);

// routes.get('/', (request, response) => {
//   return response.json({ message: 'Hello Dev!' });
// });

export default routes;
