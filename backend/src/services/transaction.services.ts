import { Type } from '@prisma/client';
import db from '../db/db';

interface createTransactionValues {
  id?: number;
  amount: string;
  concept: string;
  date: string;
  type: Type;
  categoryId: number;
  userId: number;
}

const getTransactions = async (userId: number) =>
  await db.transaction.findMany({
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

const createTransaction = async ({
  amount,
  concept,
  date,
  type,
  categoryId,
  userId,
}: createTransactionValues) =>
  await db.transaction.create({
    data: {
      amount: parseFloat(amount),
      concept,
      date,
      type,
      categoryId,
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

const updatedTransactions = async ({
  id,
  amount,
  concept,
  date,
  type,
  categoryId,
}: createTransactionValues) =>
  await db.transaction.update({
    where: {
      id,
    },
    data: {
      amount: parseFloat(amount),
      concept,
      date,
      type,
      categoryId,
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

const deletedTransactions = async (id: number) =>
  await db.transaction.delete({
    where: {
      id,
    },
  });

export default {
  getTransactions,
  createTransaction,
  updatedTransactions,
  deletedTransactions,
};
