import prisma from '../db/db';

const getsUsers = async () =>
  await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      create_at: true,
      update_at: true,
    },
  });

export default { getsUsers };
