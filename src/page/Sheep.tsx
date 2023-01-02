/* eslint-disable react-hooks/exhaustive-deps */
import React, { RefObject, useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import HomeCanvas from '../components/Card/homeCanvas'
import Hill from '../components/sheep/Hill';
import SheepController from '../components/sheep/SheepController';
import Sun from '../components/sheep/Sun';
import { useClientWidthHeiht } from '../hooks/useClientWidthHeiht';

const Sheep = () => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
  const clientReact = useClientWidthHeiht(canvasRef)

  const canvasWidth = clientReact.width;
  const canvasHeight = clientReact.height;

  const sun = Sun(canvasWidth, canvasHeight)

  const hill = [
    Hill(canvasWidth, canvasHeight, 12, 0.2, '#fd6bea'),
    Hill(canvasWidth, canvasHeight, 8, 0.5, '#ff59c2'),
    Hill(canvasWidth, canvasHeight, 6, 1.4, '#ff4674')
  ]

  const sheepController = SheepController(canvasWidth, canvasHeight)

  const animate = (ctx: CanvasRenderingContext2D, time: any) => {
    // const now = performance.now();
    // const executeTime = performance.now() - now;
    ctx.clearRect(0,0, canvasWidth, canvasHeight)
    sun.draw(ctx, time)
    let dots
    for(let i = 0; i < hill.length; i++) {
        dots = hill[i].draw(ctx)
    }
    sheepController.draw(ctx, time, dots)
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1;

      if (canvas && ctx) {
        canvas.style.width = canvasWidth + 'px';
        canvas.style.height = canvasHeight + 'px';

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;

        ctx.scale(devicePixelRatio, devicePixelRatio);

        for(let i = 0; i < hill.length; i++){
            hill[i].reSize()
        }
        sheepController.resize()
      }
    };

    setCanvas();



    window.addEventListener('resize', setCanvas, false);
    let requestId: number;
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation);
      if (ctx) {
        animate(ctx, requestId)
      }
    };
    requestAnimation();
  }, [canvasWidth, canvasHeight, animate, hill])

  return (
    <Container>
        <Canvas ref={canvasRef} />
    </Container>
  )
}

export default Sheep


const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffcaec;
`

const Canvas = styled.canvas`
    width: 100%;
    height: 100vh;
`
