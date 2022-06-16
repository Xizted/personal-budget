import { User } from '@prisma/client';
import api from '../api';

const getUsers = async () => {
  const resp = await api.get('/api/v1/users').expect(200);
  return resp.body.map((user: User) => user.username);
};

export { getUsers };
