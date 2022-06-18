import { PrismaClient } from '@prisma/client';
import { categories, transactions } from './data';
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.$queryRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;`;
    await prisma.category.deleteMany({});
    console.log('Deleted records in category table 🚮');
    await prisma.category.createMany({ data: categories });
    console.log('Added category data ♻');

    await prisma.$queryRaw`ALTER SEQUENCE "Transaction_id_seq" RESTART WITH 1;`;
    await prisma.transaction.deleteMany({});
    console.log('Deleted records in transaction table 🚮');
    await prisma.transaction.createMany({ data: transactions });
    console.log('Added transaction data ♻');
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
