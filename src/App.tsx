import React from 'react';
import Home from './page/Home';
import styled, { createGlobalStyle } from 'styled-components';

function App() {
  return (
    <Section>
      <GlobalStyle />
      <Home />
    </Section>
  );
}

export default App;
const GlobalStyle = createGlobalStyle`
menu, ol, ul {
  list-style: none;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1;
  margin: 0;
  padding: 0;
  border: 0;
 
}
a{
  text-decoration: none;
  color: inherit;
} 
`;

const Section = styled.section`
  background-color: tomato;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
