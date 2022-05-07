import React, { RefObject, useRef } from 'react';
import styled from 'styled-components';
import TypoCanvas from '../components/typo/typoCanvas';
import { useClientWidthHeiht } from '../hooks/useClientWidthHeiht';

const Typo = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientReact = useClientWidthHeiht(mainRef);

  const canvasWidth = clientReact.width;
  const canvsHeight = clientReact.height;
  return (
    <Main ref={mainRef}>
      <TypoCanvas canvasWidth={canvasWidth} canvasHeight={canvsHeight} />
    </Main>
  );
};

export default Typo;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;
