import { Wavepoint } from './wavepoint';
export interface IWaveDataModel {
  canvasWidth: number;
  canvasHeight: number;
  resize: (canvasWidth: number, canvasHeight: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export class WaveAni implements IWaveDataModel {
  canvasWidth: number;
  canvasHeight: number;
  centerX!: number;
  centerY!: number;
  point!: Wavepoint;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  resize(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2;

    this.init();
  }

  init() {
    this.point = new Wavepoint(this.centerX, this.centerY);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';

    this.point.update();

    ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
    ctx.fill();
  }
}
