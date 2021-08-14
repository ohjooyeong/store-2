import React, { ReactElement } from 'react';
import { Link } from 'lib/router';

import styled from 'styled-components';

const Div = styled.div`
  padding: 12px;
  background-color: #a1e0ff;
  color: ${props => props.theme.bodyColor};
`;

const MainPage = (): ReactElement => {
  return (
    <div>
      This is MainPage
      <Link to="/user">유저</Link>
      <Link to="/test">테스트</Link>
      <Link to="/counter">사가 카운터</Link>
    </div>
  );
};

export default MainPage;
