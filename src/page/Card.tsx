import { RefObject, useRef } from 'react';
import styled from 'styled-components';
import HomeCanvas from '../components/Card/homeCanvas';
import { useClientWidthHeiht } from '../hooks/useClientWidthHeiht';
const Card = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientReact = useClientWidthHeiht(mainRef);
  //   console.log(clientReact);
  const canvasWidth = clientReact.width;
  const canvsHeight = clientReact.height;
  return (
    <Main ref={mainRef}>
      <TextBox>
        <span>Click the Move</span>
      </TextBox>
      <HomeCanvas canvasWidth={canvasWidth} canvasHeight={canvsHeight} />
    </Main>
  );
};
export default Card;
const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #c5beaf;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 30%;
  top: 30%;
  font-size: 35px;
`;
