import server from '../src';
import prisma from '../src/db/db';
import api from './api';

describe('Get Categories', () => {
  test("'Responds with code status 200 and return a token", async () => {
    await api
      .get('/api/v1/categories')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  afterAll(() => {
    server.close();
    prisma.$disconnect();
  });
});
