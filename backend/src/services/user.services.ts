import db from '../db/db';

const getsUsers = async () =>
  await db.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      create_at: true,
      update_at: true,
    },
  });

export default { getsUsers };
