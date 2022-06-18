import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload extends jwt.JwtPayload {
  id: number;
  username: string;
}

interface RequestMiddleware extends Request {
  userId: number;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const auth = req.get('authorization');

  let token = '';

  if (auth && auth.toLocaleLowerCase().startsWith('bearer')) {
    token = auth.substring(7);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload;

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token missiong or invalid' });
  }

  (req as RequestMiddleware).userId = decodedToken.id;
  next();
};
