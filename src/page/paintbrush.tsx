import styled from 'styled-components';
import Canvas from '../components/brush/Canvas';
const Paintbrush = () => {
  return (
    <Section>
      <Canvas />
    </Section>
  );
};

export default Paintbrush;

const Section = styled.section`
  /* background-color: #badc58; */
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
