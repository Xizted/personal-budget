import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/db';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;
    if (!password) {
      const e = new Error('Argument password for data.password is missing');
      e.name = 'PASSWORD_NOT_SEND';
      next(e);
    }
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
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).send({
        error: 'Argument email is missing',
      });
    }

    if (!password) {
      return res.status(422).send({
        error: 'Argument password is missing',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
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
