import { GameScoreT } from './game';

export class Score {
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private score: GameScoreT;

  constructor(width: number, height: number, score: GameScoreT) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'gameScore';
    this.width = width;
    this.height = height;
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

  drawScore = () => {
    const header = document.createElement('div');
    header.innerText = 'Game over!';
    header.className = 'gameHeader';

    const score = document.createElement('div');
    score.innerText = `Score: ${this.score.total}`;
    score.className = 'gameTotal';


    document.body.appendChild(header);
    document.body.appendChild(score);
  }

  draw = () => {
    this.drawScore();
  }
}