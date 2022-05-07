import { IWaveDataModel, WaveAni } from './WaveAni';

export interface WaveGroupDataModel {
  canvasWidth: number;
  canvasHeigth: number;
  resize: (canvasWidth: number, canvasHeight: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export class WaveGroup implements WaveGroupDataModel {
  canvasWidth: number;
  canvasHeigth!: number;
  totalWaves: number;
  totalPoints: number;
  color: string[];
  waves: IWaveDataModel[];
  i!: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeigth = canvasHeight;
    this.totalWaves = 3;
    this.totalPoints = 6;
    // 파란색
    // this.color = [
    //   'rgba(0, 199, 235, 0.4)',
    //   'rgba(0, 146, 199, 0.4)',
    //   'rgba(0, 87, 158, 0.4)',
    // ];

    this.color = [
      'rgba(255, 0, 0, 0.4)',
      'rgba(255, 255, 0, 0.4)',
      'rgba(0, 255, 255, 0.4)',
    ];

    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave: IWaveDataModel = new WaveAni(
        canvasWidth,
        canvasHeight,
        i,
        this.totalPoints,
        this.color[i]
      );
      this.waves[i] = wave;
    }
  }

  resize(canvasWidth: number, canvasHeigth: number) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(canvasWidth, canvasHeigth);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
