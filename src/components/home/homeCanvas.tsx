import { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Polygon } from './polygon';

type CanavsProps = {
  canvasWidth: number;
  canvasHeight: number;
};

const HomeCanvas = ({ canvasWidth, canvasHeight }: CanavsProps) => {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canavs = canvasRef.current;
    const ctx = canavs?.getContext('2d');
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    const polygon = new Polygon(
      canvasWidth / 2,
      canvasHeight / 2,
      canvasHeight / 3,
      5,
      ctx!
    );

    const resize = () => {
      canavs!.width = canvasWidth * pixelRatio;
      canavs!.height = canvasHeight * pixelRatio;
      ctx?.scale(pixelRatio, pixelRatio);
    };
    resize();

    let requestId: number;

    const PolygonAnimate = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      polygon.animate(ctx);
    };

    PolygonAnimate(ctx!);

    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation);
      if (ctx) {
        PolygonAnimate(ctx);
      }
    };

    window.addEventListener('resize', resize, false);
  }, [canvasWidth, canvasHeight]);

  return <Canvas ref={canvasRef} />;
};

export default HomeCanvas;

const Canvas = styled.canvas``;
