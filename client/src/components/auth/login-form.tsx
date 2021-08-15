import React, { FC } from 'react';
import styled from 'styled-components';
import baedal from 'assets/icons/baedalee.png';
import github from 'assets/icons/github.png';
import LoginButton from './login-button';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mobile} {
    width: 100%;
    box-sizing: border-box;
  }
  ${({ theme }) => theme.tablet} {
    margin: 15px;
    max-width: 460px;
  }
  ${({ theme }) => theme.laptop} {
    width: 460px;
  }
`;

const Input = styled.input`
  font-family: ${props => props.theme.fontHannaAir};
  line-height: 1.5;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colorInputLine};
  color: ${({ theme }) => theme.colorSoftBlack};
  text-indent: 5px;
  &::placeholder {
    color: ${({ theme }) => theme.colorPlaceholder};
  }
  &:not(:first-child) {
    margin-top: 20px;
  }
  ${({ theme }) => theme.mobile} {
    font-size: 20px;
  }
  ${({ theme }) => theme.tablet} {
    font-size: 26px;
  }
  ${({ theme }) => theme.laptop} {
    font-size: 32px;
  }
`;

const Image = styled.img`
  ${({ theme }) => theme.mobile} {
    width: 40px;
  }
  ${({ theme }) => theme.tablet} {
    width: 44px;
  }
  ${({ theme }) => theme.laptop} {
    width: 48px;
  }
  margin-right: 10px;
`;

const LoginForm: FC = () => {
  return (
    <Form>
      <Input type="text" placeholder="아이디" />
      <Input type="password" placeholder="비밀번호" />
      <LoginButton type="submit" login>
        <Image src={baedal as string} alt="배달이" />
        로그인
      </LoginButton>
      <LoginButton type="button" github>
        <Image src={github as string} alt="배달이" />
        깃-헙으로 로그인
      </LoginButton>
      <LoginButton type="button" signup>
        <Image src={baedal as string} alt="배달이" />
        배민문구사로 회원가입
      </LoginButton>
    </Form>
  );
};

export default LoginForm;
