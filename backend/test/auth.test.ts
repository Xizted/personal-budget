import api from './api';
import server from '../src/index';
import prisma from '../src/db/db';
import bcrypt from 'bcrypt';
import { getUsers } from './helpers/user.helper';

describe('When register', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({});
    const passwordHash = await bcrypt.hash('123', 10);
    await prisma.user.create({
      data: {
        username: 'test1',
        email: 'email1@gmail.com',
        passwordHash,
      },
    });
  });

  test('Create a new User', async () => {
    const newUser = {
      username: 'test',
      email: 'email@gmail.com',
      password: '123',
    };

    const userAtStart = await getUsers();

    await api.post('/api/v1/auth/register').send(newUser).expect(201);

    const userAtEnd = await getUsers();

    expect(userAtEnd).toHaveLength(userAtStart.length + 1);
    expect(userAtEnd).toContain(newUser.username);
  });

  test('Responds with a status code 400 if the user already exists', async () => {
    const newUser = {
      username: 'test1',
      email: 'email@gmail.com',
      password: '123',
    };

    const userAtStart = await getUsers();

    const post = await api
      .post('/api/v1/auth/register')
      .send(newUser)
      .expect(400);

    const userAtEnd = await getUsers();

    expect(userAtEnd).toHaveLength(userAtStart.length);
    expect(post.body.error).toBe('The username field must be unique');
  });

  test('Responds with a status code 400 if the email already exists', async () => {
    const newUser = {
      username: 'test2',
      email: 'email@gmail.com',
      password: '123',
    };

    const userAtStart = await getUsers();

    const post = await api
      .post('/api/v1/auth/register')
      .send(newUser)
      .expect(400);

    const userAtEnd = await getUsers();

    expect(userAtEnd).toHaveLength(userAtStart.length);
    expect(post.body.error).toBe('The email field must be unique');
  });

  test('Responds with a status code 422 if the user is not send', async () => {
    const newUser = {
      email: 'email@gmail.com',
      password: '123',
    };

    const userAtStart = await getUsers();
    const post = await api
      .post('/api/v1/auth/register')
      .send(newUser)
      .expect(422);

    const userAtEnd = await getUsers();

    expect(userAtEnd).toHaveLength(userAtStart.length);
    expect(post.body.error).toBe(
      'Argument username for data.username is missing'
    );
  });

  test('Responds with a status code 422 if the email is not send', async () => {
    const newUser = {
      username: 'test30',
      password: '123',
    };

    const userAtStart = await getUsers();

    const post = await api
      .post('/api/v1/auth/register')
      .send(newUser)
      .expect(422);

    const userAtEnd = await getUsers();

    expect(userAtEnd).toHaveLength(userAtStart.length);
    expect(post.body.error).toBe('Argument email for data.email is missing');
  });

  test('Responds with a status code 422 if the password is not send', async () => {
    const newUser = {
      username: 'test30',
      email: 'email@gmail.com',
    };

    const userAtStart = await getUsers();

    const post = await api
      .post('/api/v1/auth/register')
      .send(newUser)
      .expect(422);

    const userAtEnd = await getUsers();

    expect(userAtEnd).toHaveLength(userAtStart.length);
    expect(post.body.error).toBe(
      'Argument password for data.password is missing'
    );
  });

  afterAll(() => {
    server.close();
  });
});

describe('When login', () => {
  test('Respond with code status 200 and return token', async () => {
    const user = {
      email: 'email1@gmail.com',
      password: '123',
    };
    const resp = await api
      .post('/api/v1/auth/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resp.body.token).not.toBeUndefined();
  });

  test('Respond with code status 422 if email is not send', async () => {
    const user = {
      password: '123',
    };
    await api.post('/api/v1/auth/login').send(user).expect(422);
  });

  test('Respond with code status 422 if password is not send', async () => {
    const user = {
      email: 'email1@gmail.com',
    };
    await api.post('/api/v1/auth/login').send(user).expect(422);
  });

  test('Respond with code status 401 if email is not correct', async () => {
    const user = {
      email: 'email30@gmail.com',
      password: '123',
    };
    await api.post('/api/v1/auth/login').send(user).expect(401);
  });

  test('Respond with code status 401 if password is not correct', async () => {
    const user = {
      email: 'email1@gmail.com',
      password: '321',
    };
    await api.post('/api/v1/auth/login').send(user).expect(401);
  });
});
