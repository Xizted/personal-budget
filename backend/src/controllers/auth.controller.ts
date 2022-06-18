import { NextFunction, Request, Response } from 'express';
import AuthServices from '../services/auth.services';
import { UserCreateSchema } from '../schemas/createOneUser.schema';
import { ValidateLogin } from '../schemas/validateLogin.schema';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    UserCreateSchema.parse(body);
    await AuthServices.register(body);
    res.status(201).end();
  } catch (e) {
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    ValidateLogin.parse(body);

    const token = await AuthServices.login(body);

    if (!token) {
      res.status(401).send({
        error: 'Incorrect email or password',
      });
    }

    res.status(200).send({ token });
  } catch (e) {
    next(e);
  }
};

export { createUser, login };
