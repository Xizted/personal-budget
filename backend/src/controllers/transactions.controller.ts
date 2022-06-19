import { NextFunction, Request, Response } from 'express';
import { TransactionCreateSchema } from '../schemas/createOneTransaction.schema';
import { IsNumber } from '../schemas/isNumber.schema';
import TransactionService from '../services/transaction.services';

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
    const filter = req.query.filter
      ? parseInt(req.query.filter.toString())
      : undefined;
    const page = req.query.page ? parseInt(req.query.page.toString()) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;
    const transactions = await TransactionService.getTransactions(
      userId,
      filter,
      page,
      limit
    );
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
    const { userId } = req as RequestMiddleware;
    body.userId = userId;
    const transaction = await TransactionService.createTransaction(body);
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
    body.id = id;
    await TransactionService.updatedTransactions(body);

    res.status(204).end();
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

    await TransactionService.deletedTransactions(id);

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
