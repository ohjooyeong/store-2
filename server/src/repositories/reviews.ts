import { db } from 'models';
import { Model, Sequelize } from 'sequelize';
import { ReviewAttribures, ReviewCreationAttributes } from 'models/review';

import errorGenerator from 'utils/error/error-generator';

const LIMIT_COUNT = 10;

const getReviews = async (
  itemId: number,
  pageId: number,
): Promise<{ reviewData: Model<ReviewAttribures, ReviewCreationAttributes>[]; totalCount: number }> => {
  const [reviewData, totalCount] = await Promise.all([
    db.Review.findAll({
      attributes: ['title', 'contents', 'imgUrl', 'score', [Sequelize.col('User.UserId'), 'UserId']],
      where: {
        ItemId: itemId,
      },
      order: [['createdAt', 'DESC']],
      limit: LIMIT_COUNT,
      offset: (pageId - 1) * LIMIT_COUNT,
      include: [
        {
          model: db.User,
          attributes: ['userId'],
        },
      ],
    }),
    db.Review.count({
      where: {
        ItemId: itemId,
      },
    }),
  ]);

  if (!reviewData) {
    throw errorGenerator({
      message: 'GET /api/reviews - reviews not found',
      code: 'reviews/reviews-not-found',
    });
  }

  return { reviewData, totalCount };
};

const checkPaidUser = async (uid: string, itemId: number): Promise<boolean> => {
  const paidCount = await db.Order.count({
    where: {
      ItemId: itemId,
      UserId: uid,
    },
  });

  return !!paidCount;
};

const postReview = async (
  uid: string,
  itemId: number,
  title: string,
  contents: string,
  score: number,
  imgUrl: string,
): Promise<{ reviewData: Model<ReviewAttribures, ReviewCreationAttributes>[]; totalCount: number }> => {
  await db.Review.create({
    title,
    contents,
    score,
    imgUrl,
    ItemId: itemId,
    UserId: uid,
  });

  return getReviews(itemId, 1);
};

export default { postReview, getReviews, checkPaidUser };
