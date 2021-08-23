import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { authReducer, authSaga } from './auth';
import { itemReducer, itemSaga } from './item';
import { loadingReducer } from './loading';
import { categoryReducer, categorySaga } from './category';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  item: itemReducer,
  category: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga(): Generator {
  try {
    yield all([authSaga(), itemSaga(), categorySaga()]);
  } catch (e) {
    throw new Error(e);
  }
}

export default rootReducer;
