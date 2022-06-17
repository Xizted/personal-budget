import { PrismaClient } from '@prisma/client';
import { categories } from './data';
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.category.deleteMany({});
    console.log('Deleted records in category table');
    await prisma.category.createMany({ data: categories });
    console.log('Added category data');
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
