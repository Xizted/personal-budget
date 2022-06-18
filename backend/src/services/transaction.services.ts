import { Type } from '@prisma/client';
import prisma from '../db/db';

interface createTransactionProps {
  id?: number;
  amount: string;
  concept: string;
  date: string;
  type: Type;
  categoryId: number;
  userId: number;
}

const getTransactions = async (userId: number) =>
  await prisma.transaction.findMany({
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
}: createTransactionProps) =>
  await prisma.transaction.create({
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
}: createTransactionProps) =>
  await prisma.transaction.update({
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
  await prisma.transaction.delete({
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
