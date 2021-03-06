import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'lib/router';
import { useDispatch, useSelector } from 'react-redux';

import { ITEM_LIST_URL } from 'constants/urls';

import SearchBar from 'components/search-bar';

import { RootState } from 'store';
import { getAutoComplete } from 'store/item';

const SearchContainer: FC = () => {
  const [search, setSearch] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isRecent, setIsRecent] = useState<boolean>(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const { autoComplete } = useSelector(({ item }: RootState) => ({
    autoComplete: item.search.autoComplete,
  }));

  const saveRecentKeywords = (keyword: string) => {
    const savedRecentKeywords = window.localStorage.getItem('recent') || '';
    const recentKeywords = savedRecentKeywords.split(',');
    if (!recentKeywords.includes(keyword)) {
      recentKeywords.unshift(keyword);
    }
    window.localStorage.setItem('recent', recentKeywords.slice(0, 5).toString());
  };

  const loadRecentKeywords = () => {
    const recentKeywords = window.localStorage.getItem('recent') || '';
    if (!recentKeywords) {
      return;
    }
    const keywords = recentKeywords
      .split(',')
      .slice(0, 5)
      .filter(keyword => keyword);

    setKeywords(keywords);
  };

  useEffect(() => {
    const set = new Set<string>(autoComplete);
    setKeywords(Array.from(set));
  }, [autoComplete]);

  useEffect(() => {
    setKeywords([]);
    if (isRecent) {
      loadRecentKeywords();
    }
  }, [isRecent]);

  const moveToSearchPage = (keyword: string) => {
    setSearch(keyword);
    saveRecentKeywords(keyword);
    history.push(`${ITEM_LIST_URL}?search=${keyword}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      setIsRecent(true);
      return;
    }
    setKeywords([]);
    setIsRecent(false);
    dispatch({ type: getAutoComplete.type, payload: { keyword: e.target.value } });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;

    moveToSearchPage(search);
    setSearch('');
  };

  const removeRecentKeyword = (index: number) => {
    const recentKeywords = keywords.slice();
    recentKeywords.splice(index, 1);
    setKeywords(recentKeywords);
    window.localStorage.setItem('recent', recentKeywords.toString());
  };

  return (
    <>
      <SearchBar
        search={search}
        keywords={keywords}
        isRecent={isRecent}
        setSearch={setSearch}
        onSubmit={onSubmit}
        onChange={onChange}
        removeRecentKeyword={removeRecentKeyword}
        moveToSearchPage={moveToSearchPage}
      />
    </>
  );
};

export default SearchContainer;
