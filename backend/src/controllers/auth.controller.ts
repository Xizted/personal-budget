import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
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

const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
  } catch (e) {
    next(e);
  }
};

export { createUser, login };
