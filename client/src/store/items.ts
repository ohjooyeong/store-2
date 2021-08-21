import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest } from 'redux-saga/effects';
import * as itemsAPI from 'utils/api/items';
import axios, { AxiosResponse } from 'axios';
import { IItem, IItemsData, IMainItems } from 'types/item';
import { put } from 'redux-saga-test-plan/matchers';
import { IError } from 'types/error';
import { finishLoading, startLoading } from './loading';

export interface IItemsState {
  categoryId?: string;
  pageId?: number;
  type?: string;
  search?: string;
}

interface StateProps {
  mainItems: {
    popularItems: IItem[] | null;
    newItems: IItem[] | null;
    recommendItems: IItem[] | null;
  };
  items: IItemsData;
  error: null | string;
}

const initialState: StateProps = {
  mainItems: {
    popularItems: null,
    newItems: null,
    recommendItems: null,
  },
  items: {
    items: null,
    pageCount: 0,
  },
  error: null,
};

const counterSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getMainItems: state => state,
    getMainItemsSuccess: (state, action: PayloadAction<string>) => {
      state.mainItems = action.payload as unknown as IMainItems;
    },
    getMainItemsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
    getItems: state => state,
    getItemsSuccess: (state, action: PayloadAction<IItemsData>) => {
      state.items = action.payload;
    },
    getItemsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      return state;
    },
  },
});

const { actions, reducer: itemsReducer } = counterSlice;
const { getMainItems, getMainItemsSuccess, getMainItemsFail, getItems, getItemsSuccess, getItemsFail } = actions;
export { getMainItems, getItems, itemsReducer };

function* getMainItemsSaga(): Generator {
  try {
    yield put(startLoading(getMainItems.type));
    const { data } = (yield call(itemsAPI.getMainItems)) as AxiosResponse<IMainItems>;
    yield put({ type: getMainItemsSuccess.type, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getMainItemsFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getMainItems.type));
  }
}

function* getItemsSaga(action: PayloadAction): Generator {
  try {
    yield put(startLoading(getItems.type));
    const { data } = (yield call(
      itemsAPI.getItems,
      action.payload as unknown as IItemsState,
    )) as AxiosResponse<IItemsData>;
    yield put({ type: getItemsSuccess.type, payload: data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { errorMessage } = e.response?.data as IError;
      yield put({ type: getItemsFail.type, payload: errorMessage });
    } else {
      throw new Error(e);
    }
  } finally {
    yield put(finishLoading(getItems.type));
  }
}

export function* itemsSaga(): Generator {
  yield takeLatest(getMainItems, getMainItemsSaga);
  yield takeLatest(getItems, getItemsSaga);
}
