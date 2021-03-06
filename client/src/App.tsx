import React from 'react';
import { BrowserRouter, Switch, Route } from 'lib/router';

import {
  MAIN_URL,
  ITEM_LIST_URL,
  ITEM_URL,
  AUTH_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  ORDER_LIST_URL,
  PAYMENT_URL,
  ADDRESS_URL,
  CART_URL,
} from 'constants/urls';

import {
  NotFoundPage,
  MainPage,
  SigninPage,
  SignupPage,
  AuthPage,
  ItemListPage,
  ItemDetailPage,
  MyOrderListPage,
  OrderPage,
  MyAddressPage,
  CartPage,
} from 'pages';
import Theme from './styles/theme';

const App: React.FC = () => {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path={MAIN_URL} component={MainPage} />
          <Route exact path={SIGNIN_URL} component={SigninPage} />
          <Route exact path={SIGNUP_URL} component={SignupPage} />
          <Route exact path={AUTH_URL} component={AuthPage} />
          <Route exact path={ITEM_LIST_URL} component={ItemListPage} />
          <Route exact path={`${ITEM_URL}/:id`} component={ItemDetailPage} />
          <Route exact path={ORDER_LIST_URL} component={MyOrderListPage} />
          <Route exact path={CART_URL} component={CartPage} />
          <Route exact path={ADDRESS_URL} component={MyAddressPage} />
          <Route exact path={PAYMENT_URL} component={OrderPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
