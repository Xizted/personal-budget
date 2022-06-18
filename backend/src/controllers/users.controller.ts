import { Request, Response } from 'express';
import UserServices from '../services/user.services';
const getUsers = async (_: Request, res: Response) => {
  const users = await UserServices.getsUsers();
  res.status(200).send(users);
};

export { getUsers };
