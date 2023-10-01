import { GameScoreT } from './game';

export class GameTotal {
  private canvas: HTMLCanvasElement;
  // private heartSprite: HTMLImageElement;
  private score: GameScoreT;

  constructor(width: number, height: number, score: GameScoreT) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'gameStats';
    // this.heartSprite = new Image();
    // this.heartSprite.src = './lifeSprite.png';
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

  renderTotal = () => {

    
    this.ctx.font = 'bold 16pt monospace';
    this.ctx.fillStyle = '#08FF10';

    this.ctx.clearRect(0, 0, this.canvas.width / 2, this.canvas.height);
    this.ctx.fillText(`Score: ${this.score.total.toString()}`, 5 , 45);
  }
}