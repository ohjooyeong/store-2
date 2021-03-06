import React, { FC, ReactNode, Dispatch, SetStateAction } from 'react';
import styled from 'lib/woowahan-components';

import alertImg from 'assets/icons/congrats.gif';
import confirmImg from 'assets/icons/wait.png';

interface ModalProps {
  type: 'alert' | 'confirm';
  header?: ReactNode;
  body?: ReactNode;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ModalBlock = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Inner = styled.div`
  @keyframes fadeinfromtop {
    from {
      margin-top: -10vh;
      opacity: 0;
    }
    to {
      margin-top: 0vh;
      opacity: 1;
    }
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme?.colorWhite};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  height: 500px;
  animation: fadeinfromtop 1s;

  ${({ theme }) => theme?.mobile} {
    border-radius: 40px;
    width: 90%;
    max-height: 90%;
  }

  ${({ theme }) => theme?.tablet} {
    width: 650px;
    max-width: 90%;
  }

  ${({ theme }) => theme?.laptop} {
    width: 650px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 200px;
    margin-bottom: 20px;

    ${({ theme }) => theme?.mobile} {
      width: 150px;
    }
  }

  div {
    color: ${props => props.theme?.colorBlack};
    font-family: ${props => props.theme?.fontEuljiro};
    font-size: 36px;

    ${({ theme }) => theme?.mobile} {
      font-size: 24px;
    }

    ${({ theme }) => theme?.tablet} {
      font-size: 32px;
    }
  }
`;

const ModalBody = styled.div`
  text-align: center;
  margin-bottom: 20px;

  div {
    color: ${props => props.theme?.colorBlack};
    font-family: ${props => props.theme?.fontHannaAir};
    font-size: 20px;

    ${({ theme }) => theme?.mobile} {
      font-size: 16px;
    }

    ${({ theme }) => theme?.tablet} {
      font-size: 18px;
    }
  }
`;

const ModalFooter = styled.div`
  margin-top: 10px;

  button {
    cursor: pointer;
    color: ${props => props.theme?.colorWhite};
    font-family: ${props => props.theme?.fontEuljiro};
    font-size: 20px;
    width: 80px;
    padding: 8px 10px;
    border: none;
    border-radius: 10px;

    &:first-child {
      margin-right: 16px;
      background-color: ${props => props.theme?.colorGreyLight};

      &:hover {
        background-color: ${props => props.theme?.colorGreyMid};
      }
    }

    &:last-child {
      background-color: ${props => props.theme?.colorPrimaryLight};

      &:hover {
        background-color: ${props => props.theme?.colorPrimary};
      }
    }
  }
`;

const Modal: FC<ModalProps> = ({ type, header, body, visible, setVisible, onCancel, onConfirm }) => {
  const closeModal = () => {
    setVisible(false);
  };

  const modalClickHandler = (e: Event) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const confirmHandler = () => {
    closeModal();
    if (onConfirm) onConfirm();
  };

  return (
    <ModalBlock onClick={modalClickHandler} visible={visible}>
      <Inner className="modal-inner">
        <ModalHeader>
          <img src={type === 'alert' ? alertImg : confirmImg} alt="modal-img" />
          <div>{header}</div>
        </ModalHeader>
        <ModalBody>
          <div>{body}</div>
        </ModalBody>
        {type === 'confirm' && (
          <ModalFooter>
            <button type="button" onClick={onCancel || closeModal}>
              ?????????
            </button>
            <button type="button" onClick={confirmHandler}>
              ???
            </button>
          </ModalFooter>
        )}
      </Inner>
    </ModalBlock>
  );
};

export default Modal;
