import { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { WaveGroup, WaveGroupDataModel } from './WaveGroup';

type CanavsProps = {
  canvasWidth: number;
  canvasHeight: number;
  Toggle: boolean;
};

const WaveCanvas = ({ canvasWidth, canvasHeight, Toggle }: CanavsProps) => {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  const waveGroup: WaveGroupDataModel = new WaveGroup(
    canvasWidth,
    canvasHeight,
    Toggle
  );
  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    waveGroup.draw(ctx);
  };
  useEffect(() => {
    const canavs = canvasRef.current;
    const ctx = canavs?.getContext('2d');

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1;

      if (canavs && ctx) {
        canavs.style.width = canvasWidth + 'px';
        canavs.style.height = canvasHeight + 'px';

        canavs.width = canvasWidth * devicePixelRatio;
        canavs.height = canvasHeight * devicePixelRatio;

        ctx.scale(devicePixelRatio, devicePixelRatio);
        waveGroup.resize(canvasWidth, canvasHeight);
      }
    };
    setCanvas();
    window.addEventListener('resize', setCanvas, false);
    let requestId: number;
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation);

      if (ctx) {
        animate(ctx);
      }
    };
    requestAnimation();
  }, [canvasWidth, canvasHeight, animate]);

  return <Canvas ref={canvasRef} />;
};

export default WaveCanvas;

const Canvas = styled.canvas``;
