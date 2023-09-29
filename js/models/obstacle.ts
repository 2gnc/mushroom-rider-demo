import { Game } from './game';

export class Obstacle {
  collisionX: number;
  collisionY: number;
  collisionRadius = 60;
  env: CanvasRenderingContext2D;

  constructor(
    width: number,
    height: number,
    env: CanvasRenderingContext2D,
  ) {
    this.collisionX = Math.random() * width;
    this.collisionY = Math.random() * height;
    this.env = env;
  }

  draw = () => {
    this.env.beginPath();
    this.env.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
    this.env.save();
    this.env.globalAlpha = 0.5;
    this.env.fill();
    this.env.restore();
  }

  destroy = () => {
    this.env.clearRect(this.collisionX - this.collisionRadius, this.collisionY - this.collisionRadius, this.collisionRadius * 2, this.collisionRadius * 2);
  }

}