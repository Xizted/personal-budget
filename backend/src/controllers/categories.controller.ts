import { NextFunction, Request, Response } from 'express';
import prisma from '../db/db';

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await prisma.category.findMany({});

  res.status(200).send(categories);
};

export { getCategories };
