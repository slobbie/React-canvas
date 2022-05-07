import { Particle } from './particle';
import { Text } from './text';
import * as PIXI from 'pixi.js';
import img from './particle.png';

export class Visual {
  textTure;
  text;
  particles: any[];
  mouse;
  container: any;
  pos: any;
  ctx!: CanvasRenderingContext2D;
  canavs!: HTMLCanvasElement;

  constructor(ctx: CanvasRenderingContext2D, canavs: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canavs = canavs;

    this.text = new Text(ctx, canavs);
    this.textTure = PIXI.Texture.from(`${img}`);

    this.particles = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 100,
    };

    document.addEventListener('pointermove', this.onMove.bind(this), false);
    document.addEventListener('touchend', this.onTouchEnd.bind(this), false);
  }

  show(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    stage: any
  ) {
    if (this.container) {
      stage.removeChild(this.container);
    }

    this.pos = this.text.setText(ctx, 'A', 2, canvasWidth, canvasHeight);

    this.container = new PIXI.ParticleContainer(this.pos.length, {
      vertices: false,
      position: true,
      rotation: false,
      scale: false,
      uvs: false,
      tint: false,
    });
    stage.addChild(this.container);

    this.particles = [];
    for (let i = 0; i < this.pos.length; i++) {
      const item = new Particle(this.pos[i], this.textTure);
      this.container.addChild(item.sprite);
      this.particles.push(item);
    }
  }

  animate() {
    for (let i = 0; i < this.particles.length; i++) {
      const item = this.particles[i];
      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sign(angle) * minDist;
        const ax = tx - this.mouse.x;
        const ay = ty - this.mouse.y;
        item.vx -= ax;
        item.vy -= ay;
      }
      item.draw();
    }
  }

  onMove(e: any) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
  onTouchEnd() {
    this.mouse.x = 0;
    this.mouse.y = 0;
  }
}
