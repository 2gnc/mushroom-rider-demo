import { VideoBg } from './videoBg';
import { Intro } from './intro';
import { GameStats } from './gameStats';
import { Environment } from './gameEnv'; 
import { Obstacle } from './obstacle';

export enum GameLifesycleEnum {
  starting = 'starting',
  playing = 'playing',
  score = 'score'
}

export class Game {
  lifesycleState: GameLifesycleEnum;
  isPaused: boolean;
  stats: GameStats;
  env: Environment;
  bg: VideoBg;
  intro: Intro;
  width: number;
  height: number;

  constructor(
    width: number,
    height: number,
  ) {
    this.width = width;
    this.height = height;
    this.lifesycleState = GameLifesycleEnum.starting;
    this.isPaused = false;
    this.stats = new GameStats(width, height);
    this.env = new Environment(width, height);
    this.bg = new VideoBg(width, height);
    this.intro = new Intro(width, height);
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

    
    const obstacle = new Obstacle(this.width, this.height, this.env.ctx);
    const obstacle2 = new Obstacle(this.width, this.height, this.env.ctx);
    setTimeout(() => {
      obstacle.draw();
    }, 1000);

    setTimeout(() => {
      obstacle2.draw();
    }, 2000);
    
    setTimeout(() => {
      obstacle.destroy();
    }, 3000);

    setTimeout(() => {
      obstacle2.destroy();
    }, 4000)

  }

  pause = () => {
    this.isPaused = true;
    this.bg.pause();
  }

  resume = () => {
    this.isPaused = false;
    this.bg.play();
  }
}