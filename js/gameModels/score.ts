import { GameScoreT } from './game';

export class Score {
  private canvas: HTMLCanvasElement;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'gameScore';
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

  drawScore = () => {
    const header = document.createElement('div');
    header.innerText = 'Game over!';
    header.className = 'gameHeader';

    document.body.appendChild(header);
  }

  draw = () => {
    this.drawScore();
  }
}