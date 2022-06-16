import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import categoriesRoutes from './routes/categories';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';

const app = express();

app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.status(200).send('Pong');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/categories', categoriesRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
