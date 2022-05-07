export interface IWavePoint {
  x: number;
  y: number;
  index: number;
}
export class Wavepoint implements IWavePoint {
  x: number;
  y: number;
  index!: number;
  private fixedY: number;
  private speed: number;
  private cur: number;
  private max: number;
  constructor(index: number, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.02;
    this.cur = index;
    this.max = Math.random() * 100 + 150;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
