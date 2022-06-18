import { Request, Response } from 'express';
import CategoryServices from '../services/category.services';

const getCategories = async (_: Request, res: Response) => {
  const categories = await CategoryServices.getCategories();

  res.status(200).send(categories);
};

export { getCategories };
