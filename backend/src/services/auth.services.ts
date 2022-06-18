import bcrypt from 'bcrypt';
import db from '../db/db';
import jwt from 'jsonwebtoken';

interface RegisterValues {
  username: string;
  password: string;
  email: string;
}

interface LoginValues {
  password: string;
  email: string;
}

const register = async ({ username, password, email }: RegisterValues) => {
  const passwordHash = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      username,
      passwordHash,
      email,
    },
  });
};

const login = async ({ email, password }: LoginValues) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      passwordHash: true,
      email: true,
    },
  });

  const passwordAccepted =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordAccepted)) {
    return false;
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.email,
    },
    process.env.SECRET!
  );

  return token;
};

export default {
  register,
  login,
};
