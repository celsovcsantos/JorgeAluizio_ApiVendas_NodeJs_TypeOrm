/*
npm init -y
npm install typescript ts-node-dev @types/node tsconfig-paths -D
npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
npm add express cors express-async-errors
npm add -D @types/express @types/cors
npm add typeorm reflect-metadata pg
npm add -D tsconfig-paths
npm add -D celebrate
npm add -D @types/joi
npm i bcryptjs -D
npm add -D @types/bcryptjs
"typeorm": "^0.3.15"
*/
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      response.status(error.statuscode).json({
        status: 'error',
        message: error.message,
      });
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆');
});
