import styled from 'styled-components';
import React, { FC } from 'react';
import { IMenu } from 'types/types';

interface IMediumMenuProps {
  menu: IMenu;
  position: { x: number; y: number };
  selectedLargeId: string;
  isLaptop: boolean;
  setLargeId: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

const LargeItemDiv = styled.ul`
  writing-mode: horizontal-tb;
  text-orientation: sideways;
  background-color: ${({ theme }) => theme.colorBg};
  border-radius: 20px;
  padding-left: 12px;
`;

const LargeItem = styled.li<LargeItemProps>`
  font-family: ${({ theme }) => theme.fontHannaAir};
  display: flex;
  background-color: ${props => (props.isSelected ? props.theme.colorOffWhite : props.theme.colorBg)};
  border: 1px solid ${({ theme }) => theme.colorOffWhite};
  padding: 5px;

  ${({ theme }) => theme.mobile} {
    width: 110px;
    font-size: 18px;
  }
  ${({ theme }) => theme.tablet} {
    width: 150px;
    font-size: 20px;
  }
  ${({ theme }) => theme.laptop} {
    width: 200px;
    font-size: 26px;
  }
`;

interface LargeItemProps {
  isSelected: boolean;
}

const LargeMenu: FC<IMediumMenuProps> = ({ menu, position, selectedLargeId, isLaptop, setLargeId, setPosition }) => {
  return (
    <LargeItemDiv>
      {menu.data.map(large => {
        const largeId = large.code.slice(0, 2);
        return (
          <LargeItem
            key={largeId}
            onMouseMove={e => {
              if (isLaptop) {
                setTimeout(() => {
                  if (e.clientX < position.x + 10) {
                    setLargeId(largeId);
                  }
                  setPosition({ x: e.clientX, y: e.clientY });
                }, 100);
              }
            }}
            onClick={() => {
              if (!isLaptop) {
                setLargeId(largeId);
              }
            }}
            isSelected={selectedLargeId === largeId}
          >
            {large.name}
          </LargeItem>
        );
      })}
    </LargeItemDiv>
  );
};

export default LargeMenu;
