import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'lib/router';

import ItemInfo from 'components/item-detail/item-info';
import Detail from 'components/item-detail/detail';

import { RootState } from 'store';
import { getItem } from 'store/item';

const MainItemContainer: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { thumbnail, title, price, contents, isLike, isSoldOut, reviewCount } = useSelector(({ item }: RootState) => ({
    thumbnail: item.item.thumbnail,
    title: item.item.title,
    price: item.item.price,
    contents: item.item.contents,
    salePercent: item.item.salePercent,
    isLike: item.item.isLike,
    isSoldOut: item.item.isSoldOut,
    reviewCount: item.item.reviewCount,
  }));

  useEffect(() => {
    dispatch({ type: getItem.type, payload: { id } });
  }, [id, dispatch]);

  const onSubmitCart = () => {
    // TODO: 장바구니 추가
  };

  const onBuy = () => {
    // TODO: 상품 구매
  };

  return (
    <>
      <ItemInfo
        thumbnail={thumbnail}
        title={title}
        price={price}
        isLike={isLike}
        isSoldOut={isSoldOut}
        onSubmitCart={onSubmitCart}
        onBuy={onBuy}
      />
      <Detail contents={contents} reviewCount={reviewCount} />
    </>
  );
};

export default MainItemContainer;