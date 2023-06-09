import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
//Rota estática para facilitar a aplicação frontend para consumir as imagens de avatar
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    response.status(error.statuscode).json({
      status: 'erro',
      message: error.message,
    });
    return response.status(500).json({
      status: 'erro',
      message: 'Internal Server Error',
    });
  }
});

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆');
});

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
npm i jsonwebtoken
npm i @types/jsonwebtoken -D
npm add multer
npm add -D @types/multer
npm add date-fns
npm add nodemailer
npm add -D @types/nodemailer

--criar banco do projeto (postgres) no docker
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
aula 19 - tempo 13:34


--criar tabela migracao Ex.: npx typeorm migration:create -n CreateUserTokens
--rodar a migracao Ex.: npm run typeorm migration:run



"typeorm": "^0.3.15"
*/
