import bcrypt from 'bcrypt';

const categories = [
  {
    name: 'Food',
  },
  {
    name: 'Travel',
  },
  {
    name: 'Services',
  },
  {
    name: 'Shopping',
  },
  {
    name: 'Books',
  },
  {
    name: 'Other',
  },
];

const transactions: any[] = [
  {
    amount: 10,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'income',
    categoryId: 1,
    userId: 1,
  },
  {
    amount: 20,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'expenses',
    categoryId: 2,
    userId: 1,
  },
  {
    amount: 30,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'income',
    categoryId: 3,
    userId: 1,
  },
  {
    amount: 40,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'expenses',
    categoryId: 4,
    userId: 1,
  },
  {
    amount: 50,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'income',
    categoryId: 5,
    userId: 1,
  },
  {
    amount: 60,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'expenses',
    categoryId: 6,
    userId: 1,
  },
  {
    amount: 70,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'income',
    categoryId: 1,
    userId: 1,
  },
  {
    amount: 80,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'expenses',
    categoryId: 2,
    userId: 1,
  },
  {
    amount: 90,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'income',
    categoryId: 3,
    userId: 1,
  },
  {
    amount: 100,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'expenses',
    categoryId: 4,
    userId: 1,
  },
  {
    amount: 110,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'income',
    categoryId: 5,
    userId: 1,
  },
  {
    amount: 120,
    concept: 'test',
    date: new Date().toISOString(),
    type: 'expenses',
    categoryId: 6,
    userId: 1,
  },
];

const newUser = {
  username: 'Test',
  passwordHash: bcrypt.hashSync('123', 10),
  email: 'test@test.com',
};

export { categories, transactions, newUser };
