import { RefObject } from 'react';
import styled from 'styled-components';
import useCanvas from '../hooks/useCanvas';

type CanavsProps = {
  canvasWidth: number;
  canvasHeight: number;
};

const WaveCanvas = ({ canvasWidth, canvasHeight }: CanavsProps) => {
  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };
  const canvasRef: RefObject<HTMLCanvasElement> = useCanvas(
    canvasWidth,
    canvasHeight,
    animate
  );

  return <Canvas ref={canvasRef} />;
};

export default WaveCanvas;

const Canvas = styled.canvas``;
