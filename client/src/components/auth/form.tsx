import React, { FC, useState } from 'react';
import styled from 'lib/woowahan-components';
import { Link } from 'lib/router';

import baedal from 'assets/icons/baedalee.png';
import github from 'assets/icons/github.png';
import { GITHUB_LOGIN_LINK } from 'constants/index';

import { SIGNIN_URL, SIGNUP_URL } from 'constants/urls';

import { LineInput, BoxButton, CheckBox, CircleLoader } from 'components';

interface AuthFormProps {
  id: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGuestLogin?: () => void;
  error: string | null;
  loading: boolean;
  isSignup?: boolean;
  onCheckChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WrapForCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  ${({ theme }) => theme?.mobile} {
    > * {
      width: 100%;
      max-width: 380px;
    }
  }

  ${({ theme }) => theme?.tablet} {
    margin: 15px;
    max-width: 380px;
  }

  ${({ theme }) => theme?.laptop} {
    width: 400px;
  }
`;

const Form = styled.form`
  > * {
    width: 100%;
  }

  .auth-input {
    margin-bottom: 20px;
  }

  .auth-check {
    margin-bottom: 12px;
  }
`;

const Image = styled.img`
  margin-right: 10px;

  ${({ theme }) => theme?.mobile} {
    width: 26px;
  }
  ${({ theme }) => theme?.tablet} {
    width: 30px;
  }
  ${({ theme }) => theme?.laptop} {
    width: 34px;
  }
`;

const Error = styled.div`
  color: ${props => props.theme?.colorError};
  font-family: ${props => props.theme?.fontHannaAir};
  font-size: 14px;
  height: 30px;
  text-indent: 5px;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: ${props => props.theme?.fontEuljiro};
  margin-top: 10px;

  a {
    font-size: 18px;
    color: ${props => props.theme?.colorTextBeige};

    &:hover {
      color: ${props => props.theme?.colorLine};
    }
  }
`;

const GuestButton = styled.button`
  padding: 5px;
  margin-bottom: 10px;

  span {
    color: ${props => props.theme?.colorGreyMid};
    font-family: ${props => props.theme?.fontHanna};
    font-size: 16px;
    padding: 0 5px;
  }

  &:hover span {
    color: ${props => props.theme?.colorPrimary};
    border-bottom: 1px solid ${props => props.theme?.colorPrimary};
  }
`;

const AuthForm: FC<AuthFormProps> = ({
  id,
  password,
  onChange,
  onSubmit,
  onGuestLogin,
  error,
  loading,
  isSignup,
  onCheckChange,
}) => {
  const [githubLoading, setGithubLoading] = useState(false);
  const goGithub = () => {
    setGithubLoading(true);
    window.location.href = GITHUB_LOGIN_LINK;
  };
  const FORM_TEXT = isSignup ? '????????????' : '?????????';

  return (
    <WrapForCenter>
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <LineInput
            type="text"
            placeholder="?????????"
            className="auth-input"
            value={id}
            name="id"
            onChange={onChange}
            maxLength={30}
          />
          <LineInput
            type="password"
            placeholder="????????????"
            className="auth-input"
            value={password}
            name="password"
            onChange={onChange}
            maxLength={20}
          />
          {isSignup && (
            <div className="auth-check">
              <CheckBox id="signup-agree" text="??????????????? ?????? ??????" onChange={onCheckChange} />
            </div>
          )}

          <Error>{error}</Error>
          {!isSignup && (
            <GuestButton type="button" onClick={onGuestLogin}>
              <span>????????? ?????????</span>
            </GuestButton>
          )}

          <BoxButton type="submit">
            {loading ? (
              <CircleLoader size="25px" color="brown" />
            ) : (
              <>
                <Image src={baedal} alt="form-icon" />
                {FORM_TEXT}
              </>
            )}
          </BoxButton>
        </Form>

        {isSignup ? (
          <LinkWrapper>
            <Link to={SIGNIN_URL}>????????? ?????????? ??????????????? ??????</Link>
          </LinkWrapper>
        ) : (
          <>
            <BoxButton type="button" color="github" onClick={goGithub}>
              {githubLoading ? (
                <CircleLoader size="25px" color="grey" />
              ) : (
                <>
                  <Image src={github} alt="github-icon" />
                  ???-????????? ?????????
                </>
              )}
            </BoxButton>
            <LinkWrapper>
              <Link to={SIGNUP_URL}>????????? ?????????? ?????????????????? ??????</Link>
            </LinkWrapper>
          </>
        )}
      </Wrapper>
    </WrapForCenter>
  );
};

export default AuthForm;
