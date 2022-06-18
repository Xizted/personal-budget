import { Request, Response } from 'express';
import prisma from '../db/db';

const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      create_at: true,
      update_at: true,
    },
  });
  res.status(200).send(users);
};

export { getUsers };
