import Konva from 'konva';
import { Environment } from './gameEnv';

export class Obstacle {
  env: Environment;

  constructor(
    width: number,
    height: number,
    env: Environment,
  ) {

    this.env = env;
  }

  draw = () => {

  }

  destroy = () => {

  }

}