import React, { FC, Dispatch, SetStateAction } from 'react';
import styled from 'lib/woowahan-components';

import { IUserId } from 'types/auth';

import { Modal } from 'components';

interface AuthSuccessModalProps {
  userId: IUserId;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const Title = styled.h2`
  span {
    color: ${props => props.theme?.colorPrimary};
  }
`;

const Info = styled.div`
  p {
    margin-bottom: 3px;
  }

  span {
    font-family: ${props => props.theme?.fontHanna};
    font-size: 105%;
    vertical-align: middle;
    margin-right: 1px;
  }
`;

const AuthSuccessModal: FC<AuthSuccessModalProps> = ({ userId, visible, setVisible }) => {
  return (
    <Modal
      type="alert"
      header={
        <Title>
          회원가입이 <span>완료</span>되었습니다.
        </Title>
      }
      body={
        <Info>
          <p>
            <span>{userId}</span>님의 회원가입을 축하합니다.
          </p>
          <p>알차고 실속있는 서비스로 찾아뵙겠습니다.</p>
        </Info>
      }
      visible={visible}
      setVisible={setVisible}
    />
  );
};

export default AuthSuccessModal;
