import prisma from '../db/db';

const getCategories = async () => await prisma.category.findMany({});

export default {
  getCategories,
};
