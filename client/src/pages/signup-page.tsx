import React, { ReactElement } from 'react';
import useWindowSize from 'hooks/use-window-size';
import NavbarContainer from 'containers/navbar-container';
import SignupContainer from 'containers/signup-container';
import { Layout } from 'components';

const SignupPage = (): ReactElement => {
  const { width } = useWindowSize();
  const isMobile = width <= 480;

  return (
    <>
      <NavbarContainer isMobile={isMobile} />
      <Layout isMobile={isMobile}>
        <SignupContainer />
      </Layout>
    </>
  );
};

export default SignupPage;