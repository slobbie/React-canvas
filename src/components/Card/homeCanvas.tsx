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

  const canavs = canvasRef.current;
  const ctx = canavs?.getContext('2d');

  const polygon = new Polygon(
    canvasWidth / 2,
    canvasHeight / 2,
    // canvasHeight + canvasHeight / 4,
    // canvasHeight / 2.5,
    canvasHeight / 3,
    9,
    ctx!
  );

  let isDown = false;
  let moveX = 0;
  let offsetX = 0;

  const onDown = (e: any) => {
    // console.log(e);
    isDown = true;
    moveX = 0;
    offsetX = e.clientX;
  };

  const onMove = (e: any) => {
    // console.log(e);
    if (isDown) {
      moveX = e.clientX - offsetX;
      offsetX = e.clientX;
      // console.log(moveX);
      // console.log(offsetX);
    }
  };

  const PolygonAnimate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    moveX *= 0.92;
    // console.log(moveX);
    polygon.animate(ctx, moveX);
  };

  const onUp = (e: any) => {
    isDown = false;
    return;
  };

  useEffect(() => {
    const canavs = canvasRef.current;
    const ctx = canavs?.getContext('2d');
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    const resize = () => {
      canavs!.width = canvasWidth * pixelRatio;
      canavs!.height = canvasHeight * pixelRatio;
      // ctx?.scale(pixelRatio, pixelRatio);
    };
    resize();

    let requestId: number;

    PolygonAnimate(ctx!);

    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation);
      if (ctx) {
        PolygonAnimate(ctx);
      }
    };
    requestAnimation();

    window.addEventListener('resize', resize, false);

    canavs!.addEventListener('pointerdown', onDown, false);
    canavs!.addEventListener('pointermove', onMove, false);
    canavs!.addEventListener('pointerup', onUp, false);
  }, [canvasWidth, canvasHeight, PolygonAnimate]);

  return <Canvas ref={canvasRef} />;
};

export default HomeCanvas;

const Canvas = styled.canvas``;
