import React, { RefObject, useRef } from 'react';
import styled from 'styled-components';
import LightWaveCanvas from '../components/LightWaveCanvas';
import useClientWidthHeiht from '../hooks/useClientWidthHeiht';

const LightWave = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientReact = useClientWidthHeiht(mainRef);
  const canvasWidth = clientReact.width;
  const canvsHeight = clientReact.height;
  return (
    <Main ref={mainRef}>
      <LightWaveCanvas canvasWidth={canvasWidth} canvasHeight={canvsHeight} />
    </Main>
  );
};

export default LightWave;

const Main = styled.main`
  /* background-color: tomato; */
  width: 100vw;
  height: 100vh;
`;
