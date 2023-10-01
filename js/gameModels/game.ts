import size from 'lodash/size';
import random from 'lodash/random';
import some from 'lodash/some';

import { nanoid } from 'nanoid'

import { VideoBg } from './videoBg';
import { Intro } from './intro';
import { GameStats } from './gameStats';
import { Environment } from './gameEnv'; 

import { checkIsSirclesIntersected } from '../helpers/checkIsCirclesIntercected';

import { GameObjectCoordsT, GameObjectCircleAreaT } from '../models/models';

export enum GameLifesycleEnum {
  starting = 'starting',
  playing = 'playing',
  score = 'score'
}

export enum GameSpeedEnum {
  x1 = 'x1',
  x2 = 'x2',
  x3 = 'x3',
}

export type EnemyT = {
  id: string;
  hit: number;
  speed: GameSpeedEnum;
  sX: number;
  sY: number;
  spawnTimeout: number;
  isQueuedToRender: boolean;
  isRendered: boolean;
  image: string;
}

export type GameScoreT = {
  total: number;
  speed: GameSpeedEnum;
  health: number;
}

export type EnemySpawnSettingT = {
  playbackSpeed: number;
  maxEnemies: number;
  enemyFrequency: number;
  hit: number;
}

const ENEMIES_SETTINGS: Record<GameSpeedEnum, EnemySpawnSettingT> = {
  [GameSpeedEnum.x1]: {
    playbackSpeed: 1.0,
    maxEnemies: 6,
    enemyFrequency: 10 * 1000,
    hit: 5,
  },
  [GameSpeedEnum.x2]: {
    playbackSpeed: 2.0,
    maxEnemies: 15,
    enemyFrequency: 5 * 1000,
    hit: 10,
  },
  [GameSpeedEnum.x3]: {
    playbackSpeed: 2.5,
    maxEnemies: 20,
    enemyFrequency: 2 * 1000,
    hit: 15,
  },
};

const HIT_AREA_HEIGHT = 0.1;
const ENEMY_RADIUS = 25;

export class Game {
  lifesycleState: GameLifesycleEnum;
  isPaused: boolean;
  stats: GameStats;
  env: Environment;
  bg: VideoBg;
  intro: Intro;
  width: number;
  height: number;
  score: GameScoreT;
  occupiedAreas: Array<GameObjectCircleAreaT>;
  enemiesQueue: Record<string, EnemyT>;

  constructor(
    width: number,
    height: number,
  ) {
    this.width = width;
    this.height = height;
    this.lifesycleState = GameLifesycleEnum.starting;
    this.isPaused = false;
    this.stats = new GameStats(width, height);
    this.env = new Environment(width, height, this.hitAxisHeight, this);
    this.bg = new VideoBg(width, height);
    this.intro = new Intro(width, height);
    this.score = {
      total: 0,
      speed: GameSpeedEnum.x1,
      health: 100,
    };
    this.enemiesQueue = {};
    this.occupiedAreas = [];
  } 

  initialize() {
    if (this.lifesycleState === GameLifesycleEnum.starting) {
      this.intro.initialize();
      this.intro.draw(this.start);
    };
  }

  start = () => {
    this.intro.clear();
    this.isPaused = false;
    this.bg.initialize();
    this.stats.initialize();
    this.env.initialize();
    this.stats.renderHealth(100);
    this.bg.play();
    this.lifesycleState = GameLifesycleEnum.playing;
    this.populateEnemiesLoop();
  }

  populateEnemiesLoop = (): void => {
    let remainsToGenerate = ENEMIES_SETTINGS[this.score.speed].maxEnemies - size(this.enemiesQueue);
    if (size(this.enemiesQueue) > ENEMIES_SETTINGS[this.score.speed].maxEnemies) {
      return;
    }
    while (remainsToGenerate > 0) {
      remainsToGenerate = remainsToGenerate - 1;
      const area = this.enemySpawnArea;
      const spawnTimeout = remainsToGenerate === ENEMIES_SETTINGS[this.score.speed].maxEnemies ? 40 : random(0, ENEMIES_SETTINGS[this.score.speed].enemyFrequency);
  
      const enemy: EnemyT = {
        id: nanoid(),
        hit: ENEMIES_SETTINGS[this.score.speed].hit,
        speed: this.score.speed,
        sX: area.x,
        sY: area.y,
        spawnTimeout,
        isQueuedToRender: false,
        isRendered: false,
        image: random(1, 50).toString(),
      }

      this.occupiedAreas.push(area);
      this.enemiesQueue[enemy.id] = enemy;
    }
  }

  pause = () => {
    this.isPaused = true;
    this.bg.pause();
  }

  resume = () => {
    this.isPaused = false;
    this.bg.play();
  }

  get hitAxisHeight(): number {
    return this.height - HIT_AREA_HEIGHT * this.height;
  }

  get enemySpawnArea(): GameObjectCircleAreaT {
    let isIntercected = true;
    let candidate = this.buildEnemyArea();

    do {
      if (!this.checkIsPointOccupied(candidate)) {
        isIntercected = false;
        break;
      }
      candidate = this.buildEnemyArea();
    } while (isIntercected);

    return candidate;
  }

  buildEnemyArea = (): GameObjectCircleAreaT => {
    const point = this.buildRandomSpawnPoint();
    return {
    ...point,
    radius: ENEMY_RADIUS,
    };
  }

  buildRandomSpawnPoint(): GameObjectCoordsT {
    return {
      x: random(ENEMY_RADIUS * 1.5, this.width - ENEMY_RADIUS * 1.5),
      y: random(this.width * 0.6, this.hitAxisHeight - 100),
    }
  }

  checkIsPointOccupied(area: GameObjectCircleAreaT): boolean {
    return some(this.occupiedAreas, (occupiedArea) => checkIsSirclesIntersected(occupiedArea, area));
  }
}