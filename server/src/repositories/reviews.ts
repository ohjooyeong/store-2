import { db } from 'models';
import { Model, Sequelize } from 'sequelize';
import { ReviewAttribures, ReviewCreationAttributes } from 'models/review';

import errorGenerator from 'utils/error/error-generator';

interface ReviewData extends ReviewAttribures {
  userId: string;
}

const LIMIT_COUNT = 10;

const postReview = async (
  uid: string,
  itemId: number,
  title: string,
  contents: string,
  score: number,
  imgUrl: string,
): Promise<void> => {
  await db.Review.create({
    title,
    contents,
    score,
    imgUrl,
    ItemId: itemId,
    UserId: uid,
  });
};

const getReviews = async (
  itemId: number,
  pageId: number,
): Promise<{ reviewData: Model<ReviewData, ReviewCreationAttributes>[]; totalCount: number }> => {
  const reviewData = (await db.Review.findAll({
    attributes: ['title', 'contents', 'imgUrl', 'score', [Sequelize.col('User.userId'), 'userId']],
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
  })) as Model<ReviewData, ReviewCreationAttributes>[];

  const totalCount = await db.Review.count({
    where: {
      ItemId: itemId,
    },
  });

  if (!reviewData) {
    throw errorGenerator({
      message: 'GET /api/reviews - reviews not found',
      code: 'reviews/reviews-not-found',
    });
  }

  return { reviewData, totalCount };
};

export default { postReview, getReviews };
