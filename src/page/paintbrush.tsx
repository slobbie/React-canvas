import styled from 'styled-components';
import PaintCanvas from '../components/brush/PaintCanvas';

/** 그림판 페이지 */
const Paintbrush = () => {
  return (
    <Section>
      <PaintCanvas />
    </Section>
  );
};

export default Paintbrush;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
