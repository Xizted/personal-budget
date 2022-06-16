import api from './api';
import server from '../src/index';

describe('index route', () => {
  test('Respond with a status code 200', (done) => {
    api.get('/ping').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  afterAll(() => {
    server.close();
  });
});
