import { Request, Response } from 'express';

import itemService, { ItemType } from 'services/items';

import errorHandler from 'utils/error/error-handler';
import { getUIDFromToken, getAccessToken, checkTokenExists } from 'utils/jwt';

interface IQuery {
  categoryId: string;
  type: ItemType;
  pageId: number;
  search: string;
}

interface IParams {
  id: string;
}

export const getMainItems = async (req: Request, res: Response): Promise<void> => {
  try {
    let uid;
    if (checkTokenExists(req)) uid = getUIDFromToken(getAccessToken(req.headers.authorization));

    const { popularItems, newItems, recommendItems } = await itemService.mainItems(req.body);

    const [popularItemsWithLike, newItemsWithLike, recommendItemsWithLike] = await Promise.all([
      itemService.matchUserLikeItem(popularItems.items, uid),
      itemService.matchUserLikeItem(newItems.items, uid),
      itemService.matchUserLikeItem(recommendItems.items, uid),
    ]);

    res.status(200).json({
      popularItems: popularItemsWithLike,
      newItems: newItemsWithLike,
      recommendItems: recommendItemsWithLike,
    });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const getItems = async (req: Request<unknown, unknown, string[], IQuery>, res: Response): Promise<void> => {
  const { categoryId, pageId, type, search } = req.query;
  try {
    let uid;
    if (checkTokenExists(req)) uid = getUIDFromToken(getAccessToken(req.headers.authorization));

    const data = await itemService.getItems(categoryId, pageId, type, search, req.body);
    const { items, totalCount, pageCount } = data;

    res.status(200).json({ items: await itemService.matchUserLikeItem(items, uid), totalCount, pageCount });
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const getItem = async (req: Request<IParams>, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    let uid;
    if (checkTokenExists(req)) uid = getUIDFromToken(getAccessToken(req.headers.authorization));

    const item = await itemService.getItem(id, uid);
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const getOrderItems = async (
  req: Request<unknown, unknown, unknown, { id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.query;
    const items = await itemService.getOrderItems(id);

    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
