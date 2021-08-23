import React, { FC, Dispatch, SetStateAction } from 'react';
import styled from 'lib/woowahan-components';
import { IItem, ESortType } from 'types/item';
import findIcon from 'assets/icons/find.png';
import ItemList from './item-list';
import Filter from './filter';
import Pagination from './pagination';

interface ItemListProps {
  items: IItem[];
  loading: boolean;
  pageCount: number;
  pageId: number;
  setPageId: Dispatch<SetStateAction<number>>;
  totalCount: number;
  sortType: ESortType;
  setSortType: Dispatch<SetStateAction<ESortType>>;
}

const Wrapper = styled.div`
  margin-top: 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-top: 100px;

  span {
    text-align: center;
    margin: 50px 0;
    color: ${props => props.theme?.colorTextBrown};
    font-family: ${props => props.theme?.fontEuljiro10};
    font-size: 50px;
  }

  img {
    width: 400px;
  }

  ${props => props.theme?.mobile} {
    padding-top: 0;

    span {
      font-size: 24px;
    }

    img {
      width: 250px;
    }
  }

  ${props => props.theme?.tablet} {
    padding-top: 50px;

    span {
      font-size: 32px;
    }

    img {
      width: 330px;
    }
  }
`;

const ItemListWrapper: FC<ItemListProps> = ({
  items,
  loading,
  pageCount,
  pageId,
  setPageId,
  totalCount,
  sortType,
  setSortType,
}) => {
  return (
    <Wrapper>
      <Filter total={totalCount} sortType={sortType} setSortType={setSortType} />
      {loading || totalCount ? (
        <>
          <ItemList items={items} isLoading={loading} />
          <Pagination pageCount={pageCount} activePage={pageId} setActivePage={setPageId} />
        </>
      ) : (
        <Empty>
          <span>앗! 그런 물건은 안 팔아요. . .</span>
          <img src={findIcon} alt="find" />
        </Empty>
      )}
    </Wrapper>
  );
};

export default ItemListWrapper;
