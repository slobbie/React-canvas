import { RefObject } from 'react';
import styled from 'styled-components';
import useCanvas from '../../hooks/useCanvas';
import { ILightSource, LightSource } from './lightSource';
import { IPoint, Point } from '../light/Point';

type CanavsProps = {
  canvasWidth: number;
  canvasHeight: number;
};

const LightWaveCanvas = ({ canvasWidth, canvasHeight }: CanavsProps) => {
  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(31, 31, 36)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const lightSource: ILightSource = new LightSource(canvasWidth, canvasHeight);

  let points: IPoint[] = [];
  const initPoints = () => {
    const POINT_NUMBER = 72;
    const PINT_CAP = canvasWidth / POINT_NUMBER;

    for (let i = 0; i <= POINT_NUMBER; i++) {
      const point: IPoint = new Point(PINT_CAP, i, canvasWidth, canvasHeight);
      points.push(point);
    }
  };
  if (canvasWidth !== 0 && canvasHeight !== 0) {
    initPoints();
  }

  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    fillBackground(ctx);
    lightSource.drawGradientLight(ctx);
    lightSource.drawLightSource(ctx);

    for (let i = 0; i < points.length; i++) {
      lightSource.drawLightLines(
        ctx,
        points[i].pointerCenterX,
        points[i].pointerCenterY
      );
      points[i].animate(ctx);
    }
  };
  const canvasRef: RefObject<HTMLCanvasElement> = useCanvas(
    canvasWidth,
    canvasHeight,
    animate
  );

  return <Canvas ref={canvasRef} />;
};

export default LightWaveCanvas;

const Canvas = styled.canvas``;
