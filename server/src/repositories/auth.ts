import { db } from 'models';
import { Model } from 'sequelize';

import { UserAttribures, UserCreationAttributes } from 'models/user';

import errorGenerator from 'utils/error/error-generator';

export const getUser = async (userId: string): Promise<Model<UserAttribures, UserCreationAttributes>> => {
  const userSnapshot = await db.User.findOne({
    attributes: ['id', 'password', 'provider'],
    where: {
      userId,
    },
  });

  if (!userSnapshot) {
    throw errorGenerator({
      message: 'POST /api/auth - account not found',
      code: 'auth/account-not-found',
    });
  }

  return userSnapshot;
};
