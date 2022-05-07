import { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';

import * as PIXI from 'pixi.js';
import { Visual } from './visual';

type CanavsProps = {
  canvasWidth: number;
  canvasHeight: number;
};

const TypoCanvas = ({ canvasWidth, canvasHeight }: CanavsProps) => {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  const WebFont = require('webfontloader');
  useEffect(() => {
    const canavs = canvasRef.current;

    const ctx = canavs?.getContext('2d');

    const stage = new PIXI.Container();

    const renderer = new PIXI.Renderer({
      width: canvasWidth,
      height: canvasHeight,
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio > 1 ? 2 : 1,
      autoDensity: true,
      powerPreference: 'high-performance',
      backgroundColor: 0xff4338,
    });

    const visual = new Visual(ctx!, canavs!);

    const resize = () => {
      renderer.resize(canvasWidth, canvasHeight);
      visual.show(ctx!, canvasWidth, canvasHeight, stage);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      visual.animate();
      renderer.render(stage);
    };

    const setWebgl = () => {
      document.body.appendChild(renderer.view);

      const blurFilter = new PIXI.filters.BlurFilter();
      blurFilter.blur = 10;
      blurFilter.autoFit = true;

      const fragSource = `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform float threshold;
        uniform float mr;
        uniform float mg;
        uniform float mb;
        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);
          vec3 mcolor = vec3(mr, mg, mb);
          if (color.a > threshold) {
            gl_FragColor = vec4(mcolor, 1.0);
          } else {
            gl_FragColor = vec4(vec3(0.0), 0.0);
          }
        }
      `;

      const uniformsData = {
        threshold: 0.5,
        mr: 244.0 / 255.0,
        mg: 193.0 / 255.0,
        mb: 41.0 / 255.0,
      };
      const thresholdFilter = new PIXI.Filter(null!, fragSource, uniformsData);
      stage.filters = [blurFilter, thresholdFilter];
      stage.filterArea = renderer.screen;
    };
    setWebgl();

    WebFont.load({
      google: {
        families: ['Hind:700'],
      },
      fontactive: () => {
        window.addEventListener('resize', resize, false);
        resize();

        requestAnimationFrame(animate);
      },
    });
  }, [canvasWidth, canvasHeight]);

  return <Canvas ref={canvasRef} style={{ position: 'absolute', top: '0' }} />;
};

export default TypoCanvas;

const Canvas = styled.canvas``;
