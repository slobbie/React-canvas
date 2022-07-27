import React, { RefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import WaveCanvas from '../components/wave/waveCanvas';
import { useClientWidthHeiht } from '../hooks/useClientWidthHeiht';

const Wave = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientReact = useClientWidthHeiht(mainRef);

  const canvasWidth = clientReact.width;
  const canvsHeight = clientReact.height;

  const [active, setActive] = useState(false);

  const ColorHandler = () => {
    setActive((prev) => !prev);
  };
  return (
    <Container>
      <CardContainer active={active}>
        <TopContainer>
          <LargeText>Waves</LargeText>
          <Main ref={mainRef}>
            <WaveCanvas
              canvasWidth={canvasWidth}
              canvasHeight={canvsHeight}
              Toggle={active}
            />
          </Main>
          <Button onClick={ColorHandler} active={active} />
          <SmallText>Click Me!</SmallText>
          <Text></Text>
        </TopContainer>
        <BottomContainer></BottomContainer>
      </CardContainer>
    </Container>
  );
};

export default Wave;

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
  margin-top: 45px;
`;

const CardContainer = styled.div<{ active: boolean }>`
  transition: all 1s ease;
  width: 375px;
  height: 550px;
  display: flex;
  flex-direction: column;
  border: 25px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  background-color: ${(props) => (props.active ? '#ec697b' : '#5ab9ed')};
  color: #fff;
  position: relative;
  cursor: grab;
  border-radius: 50px;
  /* overflow: hidden; */
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1.2;
  position: relative;
  align-items: center;
  justify-content: center;
  /* padding: 1em 15px; */
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.2;
  padding: 0 1em;
`;

const Text = styled.h2`
  color: #fff;
  text-transform: uppercase;
  margin: 0;
  z-index: 100;
  font-size: 50px;
  font-weight: 900;
  padding: 1rem;
`;

const SmallText = styled.span`
  font-size: 11px;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
  margin-top: 10px;
`;

const LargeText = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
  margin-top: 20px;
`;

const Button = styled.button<{ active: boolean }>`
  transition: all 1s ease;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: none;
  margin-top: 20px;
  background-color: ${(props) => (props.active ? '#5ab9ed' : '#ec697b')};
  border: 3px solid #fff;
  border-radius: 100%;
`;
