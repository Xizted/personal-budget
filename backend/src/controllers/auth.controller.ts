import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/db';
import { UserCreateSchema } from '../schemas/createOneUser.schema';
import { ValidateLogin } from '../schemas/validateLogin.schema';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    UserCreateSchema.parse(body);
    const { username, password, email } = body;

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        passwordHash,
        email,
      },
    });

    res.status(201).send(newUser);
  } catch (e) {
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    ValidateLogin.parse(body);
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        passwordHash: true,
        email: true,
      },
    });

    const passwordAccepted =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordAccepted)) {
      res.status(401).send({
        error: 'Incorrect email or password',
      });
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.email,
        },
        process.env.SECRET!
      );

      res.status(200).send({ token });
    }
  } catch (e) {
    next(e);
  }
};

export { createUser, login };
