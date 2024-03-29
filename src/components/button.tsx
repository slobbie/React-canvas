import React, { forwardRef, ReactNode, useRef } from 'react';
import styled, { css } from 'styled-components';

interface BtnProps {
  color: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Button = React.forwardRef((props: BtnProps, ref) => {
  const { color, onClick } = props;

  return (
    <Btn
      className='CanvasColor'
      style={{ backgroundColor: color }}
      onClick={(e) => onClick(e)}
      color={color}
    />
  );
});
// const forwardRefButton = React.forwardRef(Button);
export default Button;

const Btn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  margin: 10px 10px 10px 10px;
  cursor: pointer;
  /* ${({ color }) =>
    color === 'black' &&
    css`
      background-color: #333;
    `}
  ${({ color }) =>
    color === 'white' &&
    css`
      background-color: #fff;
    `}
    ${({ color }) =>
    color === 'red' &&
    css`
      background-color: #ff0000;
    `}
    ${({ color }) =>
    color === 'tomato' &&
    css`
      background-color: #ff6347;
    `}
    ${({ color }) =>
    color === 'yellow' &&
    css`
      background-color: #fed330;
    `}
    ${({ color }) =>
    color === 'green' &&
    css`
      background-color: #26de81;
    `}
    ${({ color }) =>
    color === 'blue' &&
    css`
      background-color: #45aaf2;
    `}
    ${({ color }) =>
    color === 'navy' &&
    css`
      background-color: #3867d6;
    `}
    ${({ color }) =>
    color === 'Purple' &&
    css`
      background-color: #8854d0;
    `} */
`;
