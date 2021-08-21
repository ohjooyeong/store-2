import React, { FC, Dispatch, SetStateAction } from 'react';
import styled from 'lib/woowahan-components';
import { IItem, ESortType } from 'types/item';
import ItemList from './item-list';
import Filter from './filter';
import Pagination from './pagination';

interface ItemListProps {
  items: IItem[];
  loading: boolean;
  pageCount: number;
  pageId: number;
  setPageId: Dispatch<SetStateAction<number>>;
  sortType: ESortType;
  setSortType: Dispatch<SetStateAction<ESortType>>;
}

const Wrapper = styled.div`
  margin-top: 90px;
  margin-bottom: 50px;

  ${props => props.theme?.mobile} {
    margin-top: 50px;
  }

  ${props => props.theme?.tablet} {
    margin-top: 70px;
  }
`;

const ItemListWrapper: FC<ItemListProps> = ({
  items,
  loading,
  pageCount,
  pageId,
  setPageId,
  sortType,
  setSortType,
}) => {
  return (
    <Wrapper>
      {loading && <div>로딩중</div>}
      <Filter total={76} sortType={sortType} setSortType={setSortType} />
      <ItemList items={items} />
      <Pagination pageCount={pageCount} activePage={pageId} setActivePage={setPageId} />
    </Wrapper>
  );
};

export default ItemListWrapper;
