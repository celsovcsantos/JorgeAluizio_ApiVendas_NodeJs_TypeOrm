import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface iTokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token não existente');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    //console.log(decodedToken);
    const { sub } = decodedToken as iTokenPayload;

    req.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Token inválido');
  }

  //   {
  //   iat: 1682597209,
  //   exp: 1682683609,
  //   sub: '69050588-76ec-47e6-99c6-546914846d4f'
  // }
}
