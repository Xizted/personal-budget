import { Request, Response } from 'express';
import prisma from '../db/db';

const getUsers = async (req: Request, res: Response) => {
  const usersDB = await prisma.user.findMany({});

  const users = usersDB.map((user) => {
    const { passwordHash, ...data } = user;
    return {
      ...data,
    };
  });

  res.status(200).send(users);
};

export { getUsers };
