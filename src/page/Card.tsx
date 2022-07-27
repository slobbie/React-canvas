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
  console.log(canvasWidth);
  return (
    <Container>
      <CardContainer>
        <TextBox>
          <span>Click the Move</span>
        </TextBox>
        <Main ref={mainRef}>
          <HomeCanvas canvasWidth={canvasWidth} canvasHeight={canvsHeight} />
        </Main>
        <Line />
      </CardContainer>
    </Container>
  );
};
export default Card;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  border: 3px solid white;
  border-radius: 50px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background-color: #dee2e5;
`;
const Main = styled.main`
  width: 450px;
  height: 400px;
  z-index: 10;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-top: 25px;
`;

const Line = styled.span`
  border: 3px solid white;
  height: 22rem;
  position: absolute;
  border-radius: 10px;
  margin: 0 auto;
  display: block;
  bottom: 15%;
  left: 50%;
`;
