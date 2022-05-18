import React from 'react';
import Paintbrush from './page/paintbrush';
import styled, { createGlobalStyle } from 'styled-components';
import Nav from './layout/Nav';
import { Route, Routes } from 'react-router-dom';
import LightWave from './page/lightWave';
import Wave from './page/wave';
import Typo from './page/typo';
import Card from './page/Card';
import Tag from './components/tag/tag';

function App() {
  return (
    <Section>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path='/canvas-example' element={<Card />} />
        <Route path='/wave' element={<Wave />} />
        {/* <Route path='/tag' element={<Tag />} /> */}
        {/* <Route path='/typo' element={<Typo />} /> */}
        <Route path='/brush' element={<Paintbrush />} />
        <Route path='/light' element={<LightWave />} />
      </Routes>
    </Section>
  );
}

export default App;
const GlobalStyle = createGlobalStyle`
menu, ol, ul {
  list-style: none;
  padding: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  font-family: 'Droid Sans', 'Droid Serif';
  line-height: 1;
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* min-height: 100vh; */
 
}
a{
  text-decoration: none;
  color: inherit;
} 
`;

const Section = styled.section`
  /* background-color: #1e90ff; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
`;
