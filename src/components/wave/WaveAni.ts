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
  color: string;
  index: number;
  totalPoints: number;
  points: any[];
  pointGap!: number;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    index: number,
    totalPoints: number,
    color: string
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2;

    this.pointGap = this.canvasWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.points = [];

    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Wavepoint(
        this.index + i,
        this.pointGap * i,
        this.centerY
      );
      this.points[i] = point;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }
    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.canvasWidth, this.canvasHeight);
    ctx.lineTo(this.points[0].x, this.canvasHeight);
    ctx.fill();
    ctx.closePath();
  }
}
