import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'lib/router';

import useInputs from 'hooks/use-inputs';

import authValidation from 'utils/validation/auth-validation';
import { MAIN_URL } from 'constants/urls';

import AuthForm from 'components/auth/form';

import { RootState } from 'store';
import { getLogin, getLoginReset } from 'store/auth';

const SigninContainer: FC = () => {
  const history = useHistory();
  const [{ id, password }, onChange] = useInputs({ id: '', password: '' });
  const [authError, setAuthError] = useState<null | string>(null);

  const { loading, error, userId, userLoading } = useSelector(
    ({ auth, loading }: RootState) => ({
      loading: loading['auth/getLogin'],
      error: auth.login.error,
      userId: auth.user.userId,
      userLoading: loading['auth/getUser'],
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: getLoginReset });
    };
  }, [dispatch]);

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  useEffect(() => {
    if (userId || userLoading) {
      history.push(MAIN_URL);
    }
  }, [userId, history, userLoading]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation: string | boolean = authValidation({ id, password });
    if (validation !== true) setAuthError(validation as string);
    else dispatch({ type: getLogin.type, payload: { id, password } });
  };

  const onGuestLogin = () => {
    dispatch({ type: getLogin.type, payload: { id: 'guest', password: 'guest' } });
  };

  return (
    <AuthForm
      id={id}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
      onGuestLogin={onGuestLogin}
      error={authError}
      loading={loading}
    />
  );
};

export default SigninContainer;
