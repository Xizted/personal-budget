import server from '../src';
import api from './api';

describe('user route', () => {
  test('Respond with all user as JSON', async () => {
    await api
      .get('/api/v1/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  afterAll(() => {
    server.close();
  });
});
