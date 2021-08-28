import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'lib/router';

import { RootState } from 'store';
import { postOrder, getOrderItems } from 'store/order';
import { getListAddress } from 'store/address';

import Order from 'components/order';

import {
  userValidation,
  addressValidation,
  receiverValidation,
  phoneValidation,
} from 'utils/validation/order-validation';
import { cartGenerator } from 'utils/cart-generator';
import { CartItem } from 'types/cart';

interface IOrderItems {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  count: number;
}

const parseOrderParams = (orderParms: string): { itemIDs: string; count: number[] } => {
  const arr = orderParms.split(',');
  const idArr: string[] = [];
  const countArr: number[] = [];

  arr.forEach(orderParam => {
    const [id, count] = orderParam.split('-');

    if (!id || !count) {
      throw new Error('invalid params');
    }

    idArr.push(id);
    countArr.push(Number(count));
  });

  return {
    itemIDs: idArr.join(','),
    count: countArr,
  };
};

const OrderContainer: FC = () => {
  const [phone, setPhone] = useState('');
  const [userError, setUserError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [orderItems, setOrderItems] = useState<IOrderItems[]>([]);
  const [user, setUser] = useState('');
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [addressChecked, setaddressChecked] = useState('기타');
  const { userId, submitError, itemsData, getLoading, submitLoading, addresses } = useSelector(
    ({ auth, order, loading, address }: RootState) => ({
      userId: auth.user.userId || '',
      submitError: order.postError || '',
      itemsData: order.orderItems,
      getLoading: loading['order/getOrderItems'],
      submitLoading: loading['order/postOrder'],
      addresses: address.list,
    }),
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(userId);
  }, [userId]);

  useEffect(() => {
    const orderParamsString = window.sessionStorage.getItem('order') || '';
    const { count } = parseOrderParams(orderParamsString);

    const newOrderItems = itemsData.map((itemData, i) => {
      return { count: count[i], ...itemData };
    });

    setOrderItems(newOrderItems);
  }, [itemsData]);

  useEffect(() => {
    try {
      const orderParamsString = window.sessionStorage.getItem('order') || '';
      const { itemIDs } = parseOrderParams(orderParamsString);
      dispatch({ type: getOrderItems.type, payload: itemIDs });
      dispatch({ type: getListAddress.type });
    } catch (err) {
      setOrderItems([]);
      window.sessionStorage.removeItem('order');
      history.goBack();
    }
  }, [dispatch, history]);

  const onChange = (id: 'user' | 'receiver' | 'address') => (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (id) {
      case 'user':
        setUser(e.target.value);
        break;
      case 'receiver':
        setReceiver(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      default:
    }
  };

  const pickAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { address, receiver } = addresses.find(address => address.name === e.target.value) || {
      address: '',
      receiver: '',
    };
    setReceiver(receiver);
    setAddress(address);
    setaddressChecked(e.target.value);
  };

  const updateCart = () => {
    const data = sessionStorage.getItem('order') as string;
    const selectedItems = data.split(',');
    const selectedItemIds: string[] = [];
    selectedItems.forEach(item => selectedItemIds.push(item.split('-')[0]));
    const cartItems = cartGenerator();
    const updateItems: CartItem[] = [];
    cartItems.forEach(item => {
      if (!selectedItemIds.includes(item.id)) {
        updateItems.push(item);
      }
    });
    let cartItemsString = '';
    updateItems.forEach(item => {
      cartItemsString += `${item.id},${item.thumbnail},${item.title},${item.count},${item.price},`;
    });
    cartItemsString = cartItemsString.substring(0, cartItemsString.length - 1);
    localStorage.setItem('cart', cartItemsString);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserError('');
    setPhoneError('');
    setReceiverError('');
    setAddressError('');

    if (userValidation(user)) {
      setUserError(userValidation(user));
      return;
    }
    if (phoneValidation(phone)) {
      setPhoneError(phoneValidation(phone));
      return;
    }
    if (addressValidation(address)) {
      setAddressError(addressValidation(address));
      return;
    }
    if (receiverValidation(receiver)) {
      setAddressError(receiverValidation(receiver));
      return;
    }

    const itemList = orderItems.map(({ id, count }) => ({
      quantity: count,
      itemId: id,
    }));

    const payload = {
      user,
      phone: phone.replace(/-/g, ''),
      address,
      receiver: receiver || user,
      itemList,
    };

    dispatch({ type: postOrder.type, payload });
    updateCart();
  };

  return (
    <Order
      onSubmit={onSubmit}
      orderItems={orderItems}
      phone={phone}
      setPhone={setPhone}
      userError={userError}
      phoneError={phoneError}
      receiverError={receiverError}
      addressError={addressError}
      submitError={submitError}
      user={user}
      address={address}
      receiver={receiver}
      onChange={onChange}
      getLoading={getLoading}
      submitLoading={submitLoading}
      addresses={addresses}
      pickAddress={pickAddress}
      addressChecked={addressChecked}
    />
  );
};

export default OrderContainer;
