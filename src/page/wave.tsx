import React, { RefObject, useRef } from 'react';
import styled from 'styled-components';
import WaveCanvas from '../components/waveCanvas';
import { useClientWidthHeiht } from '../hooks/useClientWidthHeiht';

const Wave = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientReact = useClientWidthHeiht(mainRef);

  const canvasWidth = clientReact.width;
  const canvsHeight = clientReact.height;
  return (
    <Main ref={mainRef}>
      <WaveCanvas canvasWidth={canvasWidth} canvasHeight={canvsHeight} />
    </Main>
  );
};

export default Wave;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;
