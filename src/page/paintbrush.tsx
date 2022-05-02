import styled from 'styled-components';
import Canvas from '../components/Canvas';
const Paintbrush = () => {
  return (
    <Section>
      <Canvas />
    </Section>
  );
};

export default Paintbrush;

const Section = styled.section`
  background-color: #badc58;
  border-radius: 15px;
`;
