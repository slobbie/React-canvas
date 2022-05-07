export interface PropsDataModal {
  canvasWidth: number;
  canvasHeight: number;
  str: string;
  density: number;
  ctx: CanvasRenderingContext2D;
}

export class Text {
  ctx!: CanvasRenderingContext2D;
  canavs!: HTMLCanvasElement;
  constructor(ctx: CanvasRenderingContext2D, canavs: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canavs = canavs;
  }

  setText(
    ctx: any,
    str: string,
    density: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.canavs.width = canvasWidth;
    this.canavs.height = canvasHeight;
    const myText = str;
    const fontWidth = 700;
    const fontSize = canvasHeight / 1.2;
    const fontName = 'Hind';

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
    ctx.textBaseline = `middle`;
    const fontPos = ctx.measureText(myText);
    ctx.fillText(
      myText,
      (canvasWidth - fontPos.width) / 2,
      fontPos.actualBoundingBoxAscent +
        fontPos.actualBoundingBoxDescent +
        (canvasHeight - fontSize) / 2
    );
    return this.dotPos(ctx, density, canvasWidth, canvasHeight);
  }
  dotPos(
    ctx: CanvasRenderingContext2D,
    density: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    let imgWidth = canvasWidth === 0 ? 500 : canvasWidth;
    let imgHeight = canvasWidth === 0 ? 500 : canvasWidth;

    const imageData = this.ctx!.getImageData(0, 0, imgWidth, imgHeight).data;

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel;

    for (let hegiht = 0; hegiht < canvasHeight; hegiht += density) {
      ++i;
      const slide = i % 2 === 0;
      width = 0;
      if (+slide === 1) {
        width += 6;
      }
      for (width; width < canvasWidth; width += density) {
        pixel = imageData[(width + hegiht * canvasWidth) * 4 - 1];
        if (
          pixel !== 0 &&
          width > 0 &&
          width < canvasWidth &&
          hegiht > 0 &&
          hegiht < canvasHeight
        ) {
          particles.push({
            x: width,
            y: hegiht,
          });
        }
      }
    }
    return particles;
  }
}
