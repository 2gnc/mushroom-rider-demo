import { GameScoreT } from './game';
import Konva from 'konva';
export class GameStats {
  private canvas: HTMLCanvasElement;
  private heartSprite: HTMLImageElement;
  private score: GameScoreT;

  constructor(width: number, height: number, score: GameScoreT) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'gameStats';
    this.heartSprite = new Image();
    this.heartSprite.src = './lifeSprite.png';
    this.score = score;
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

  renderHealth = () => {
    const healthPercent = this.score.health;
    let spriteOffsetX = 0;
    if (healthPercent <= 0) {
      spriteOffsetX = 200;
    } else if(healthPercent <= 50) {
      spriteOffsetX = 100;
    }

    
    const heartFrameW = 100;
    const heartFrameH = 80;
    const heartPosX = this.canvas.width - 50;
    const heartPosY = 10;
    const heartW = 30;
    const heartH  = 20;
    
    this.ctx.font = 'bold 16pt monospace';
    this.ctx.fillStyle = 'red';

    const health =  this.score.health < 0 ? 0 : this.score.health;

    this.ctx.clearRect(100, 0, this.canvas.width - 100, this.canvas.height);
    this.drawSprite(this.heartSprite, spriteOffsetX, 0, heartFrameW, heartFrameH, heartPosX, heartPosY, heartW, heartH);
    this.ctx.fillText(`${health.toString()}%`, heartPosX - 5 , heartPosY + 45);
  }
}