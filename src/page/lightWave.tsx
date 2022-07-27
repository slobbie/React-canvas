import React, { RefObject, useRef } from 'react';
import styled from 'styled-components';
import LightWaveCanvas from '../components/light/LightWaveCanvas';
import { useClientWidthHeiht } from '../hooks/useClientWidthHeiht';

const LightWave = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientReact = useClientWidthHeiht(mainRef);
  //   console.log(clientReact);
  const canvasWidth = clientReact.width;
  const canvsHeight = clientReact.height;
  return (
    <Container>
      <CardContainer>
        <Main ref={mainRef}>
          <LightWaveCanvas
            canvasWidth={canvasWidth}
            canvasHeight={canvsHeight}
          />
        </Main>
      </CardContainer>
    </Container>
  );
};

export default LightWave;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Main = styled.main`
  transition: all 1s ease;
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 100%;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 40px;
  transform: rotateZ(180deg);
`;

const CardContainer = styled.div`
  transition: all 1s ease;
  width: 375px;
  height: 550px;
  display: flex;
  flex-direction: column;
  border: 25px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  background-color: #5ab9ed;
  color: #fff;
  position: relative;
  cursor: grab;
  border-radius: 50px;
  /* overflow: hidden; */
`;
