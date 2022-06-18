import { NextFunction, Request, Response } from 'express';
import { TransactionCreateSchema } from '../schemas/createOneTransaction.schema';
import prisma from '../db/db';
import { IsNumber } from '../schemas/isNumber.schema';

interface RequestMiddleware extends Request {
  userId: number;
}

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as RequestMiddleware).userId;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        concept: true,
        amount: true,
        date: true,
        type: true,
        category: true,
      },
    });

    res.status(200).send(transactions);
  } catch (error) {
    next(error);
  }
};

const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    TransactionCreateSchema.parse(body);
    const { amount, concept, date, type, categoryId } = body;

    const { userId } = req as RequestMiddleware;

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        concept,
        date,
        type,
        categoryId: categoryId,
        userId: userId,
      },
      select: {
        id: true,
        amount: true,
        concept: true,
        date: true,
        type: true,
      },
    });

    res.status(201).send(transaction);
  } catch (error) {
    next(error);
  }
};

const updatedTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    IsNumber.parse(req.params.id);
    const id = parseInt(req.params.id);
    const { body } = req;
    TransactionCreateSchema.parse(body);
    const { amount, concept, date, type, categoryId } = body;
    const { userId } = req as RequestMiddleware;
    console.log({ id, userId });
    const transactionUpdated = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        amount,
        concept,
        date,
        type,
        categoryId,
        userId,
      },
      select: {
        id: true,
        amount: true,
        concept: true,
        date: true,
        type: true,
        category: true,
      },
    });

    res.status(200).send(transactionUpdated);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deletedTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    IsNumber.parse(req.params.id);
    const id = parseInt(req.params.id);

    await prisma.transaction.delete({
      where: {
        id,
      },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export {
  getTransactions,
  createTransaction,
  updatedTransactions,
  deletedTransactions,
};
