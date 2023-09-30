export class GameStats {
  private canvas: HTMLCanvasElement;
  private heartSprite: HTMLImageElement;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'gameStats';
    this.heartSprite = new Image();
    this.heartSprite.src = './lifeSprite.png';
  }

  initialize() {
    document.body.appendChild(this.canvas);
  }

  get ctx() {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Boom');
    }
    return context;
  }

  drawSprite = (
    img: HTMLImageElement,
    spriteCoordX: number,
    spriteCoordY: number,
    frameWidth: number,
    frameHeigth: number,
    canvasPosX: number,
    canvasposY: number,
    drawFrameWidth: number,
    drawFrameheight: number,
  ) => {
    this.ctx.drawImage(img,
      spriteCoordX,
      spriteCoordY,
      frameWidth,
      frameHeigth,
      canvasPosX,
      canvasposY,
      drawFrameWidth,
      drawFrameheight);
  }

  renderHealth = (healthPercent: number) => {
    let spriteOffsetX = 0;
    if (healthPercent === 0) {
      spriteOffsetX = 200;
    } else if(healthPercent <= 50) {
      spriteOffsetX = 100;
    }
    console.log(this.canvas)
    const heartFrameW = 100;
    const heartFrameH = 80;
    const heartPosX = this.canvas.width - 40;
    const heartPosY = 10;
    const height = 80
    const heartW = 30;
    const heartH  = 20;

    this.ctx.clearRect(this.canvas.width - 50, this.canvas.height - 50, 150, height);
    this.drawSprite(this.heartSprite, spriteOffsetX, 0, heartFrameW, heartFrameH, heartPosX, heartPosY, heartW, heartH);
  }
}