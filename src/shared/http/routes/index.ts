import productRouter from '@modules/products/routes/productRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);

// routes.get('/', (request, response) => {
//   return response.json({ message: 'Hello Dev!' });
// });

export default routes;
