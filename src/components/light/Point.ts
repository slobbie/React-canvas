import { PI2 } from './Math';
export interface IPoint {
  pointerCenterX: number;
  pointerCenterY: number;
  animate: (ctx: CanvasRenderingContext2D) => void;
}

export class Point implements IPoint {
  pointerCenterX: number;
  pointerCenterY: number;
  private radian: number;
  private CENTER_LINE: number;
  private VELOCITY: number;
  private AMPLITUDE: number;
  private POTNT_RADIUS: number;

  constructor(
    POINT_CAP: number,
    i: number,
    canvasWidth: number,
    canvasHeigth: number
  ) {
    this.pointerCenterX = POINT_CAP * i;
    this.radian = i * 0.38;
    this.CENTER_LINE = canvasHeigth / 3;
    this.VELOCITY = 0.005;
    this.AMPLITUDE = canvasHeigth / 14;
    this.POTNT_RADIUS = canvasWidth / 600 < 4 ? 4 : canvasWidth / 600;
    this.pointerCenterY =
      this.AMPLITUDE * Math.sin(this.radian) * this.CENTER_LINE;
  }

  animate(ctx: CanvasRenderingContext2D) {
    this.radian += this.VELOCITY;
    this.pointerCenterY =
      this.AMPLITUDE * Math.sin(this.radian) + this.CENTER_LINE;

    ctx.beginPath();
    ctx.fillStyle = 'rgb(102 , 103, 171)';
    ctx.arc(
      this.pointerCenterX,
      this.pointerCenterY,
      this.POTNT_RADIUS,
      0,
      PI2
    );
    ctx.fill();
  }
}
