import dotenv from 'dotenv';
import app from './app';
dotenv.config();

const PORT = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT!;
const server = app.listen(PORT, () => {
  console.log(`⚡ Server listening on port ${PORT} `);
});

export default server;
