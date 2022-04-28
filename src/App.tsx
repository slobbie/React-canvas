import React from 'react';
import Home from './page/Home';
import styled from 'styled-components';

function App() {
  return (
    <Section>
      <Home />
    </Section>
  );
}

export default App;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
