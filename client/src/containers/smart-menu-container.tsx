import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { IMenu, IMenuChild, ICategory } from 'types/category';

import SmartMenu from 'components/smart-menu';

import { RootState } from 'store';

interface SmartMenuContainerProps {
  currentCode?: string;
}

const generateMenu = (data: ICategory[]) => {
  const dataJson = { data: [] } as IMenu;
  let idx = -1;
  data.forEach(row => {
    const category = JSON.parse(JSON.stringify(row)) as ICategory;
    const mediumCode: string = category.code.slice(2, 4);

    if (category.code.indexOf('0000') >= 0) {
      dataJson.data.push(category);
      idx += 1;
    } else if (category.code.lastIndexOf('00') === 4) {
      if (dataJson.data[idx].child === undefined) {
        dataJson.data[idx].child = [category];
      } else {
        dataJson.data[idx].child?.push(category);
      }
    }

    if (dataJson.data[idx].child?.[Number(mediumCode) - 1].child === undefined) {
      if (dataJson.data[idx]?.child) {
        (dataJson.data[idx].child as Array<IMenuChild>)[Number(mediumCode) - 1].child = [category];
      }
    } else {
      dataJson.data[idx].child?.[Number(mediumCode) - 1].child?.push(category);
    }
  });
  return dataJson;
};

const SmartMenuContainer: FC<SmartMenuContainerProps> = ({ currentCode }) => {
  const { data } = useSelector(({ category }: RootState) => ({
    data: category.categories.data,
  }));
  const currentName = useMemo(
    () => (currentCode ? data.find(category => category.code === currentCode)?.name : '캇테고리'),
    [currentCode, data],
  );
  const menu = useMemo(() => generateMenu(data), [data]);
  return <SmartMenu currentMenu={currentName || '캇테고리'} menu={menu} />;
};

export default SmartMenuContainer;
