import Konva from 'konva';
import { Environment } from './gameEnv';
import { GameSpeedEnum } from './game';
import { GameObjectCircleAreaT } from '../models/models';

export type EnemyT = {
  id: string;
  hit: number;
  speed: GameSpeedEnum;
  area: GameObjectCircleAreaT;
  spawnTimeout: number;
  isQueuedToRender: boolean;
  isRendered: boolean;
  image: string;
  bonus: number;
}

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

  // buildEnemy = (sX: number, sY: number): EnemyT => {

  // }

}