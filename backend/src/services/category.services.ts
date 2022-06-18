import db from '../db/db';

const getCategories = async () => await db.category.findMany({});

export default {
  getCategories,
};
