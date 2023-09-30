import Konva from 'konva';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import chain from 'lodash/chain';
import map from 'lodash/map';
import values from 'lodash/values';

import { Game, EnemyT } from './game';

export const ENEMY_UPDATE_INTERVAL = 500;

export class Environment {
  private canvas: HTMLCanvasElement;
  private stage: Konva.Stage;
  private layer: Konva.Layer;
  private deadlineAxis: number;
  private game: Game;

  constructor(width: number, height: number, deadlineAxis: number, game: Game) {
    this.deadlineAxis = deadlineAxis;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'gameEnv';
    this.stage = new Konva.Stage({
      container: 'env',
      width,
      height
    });
    this.layer = new Konva.Layer();
    this.game = game;
  }
  
  initialize() {
    document.body.appendChild(this.canvas);
    setInterval(() => {
      this.queueEnemiesToRender();
    }, ENEMY_UPDATE_INTERVAL);
  }

  queueEnemiesToRender = () => {
    const toRender = filter(values(this.game.enemiesQueue), (enemy) => !enemy.isQueuedToRender);

    forEach(toRender, (enemy) => {
      enemy.isQueuedToRender = true;
    })

    forEach(toRender, async (enemy) => {
      const promise = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, enemy.spawnTimeout)
      });
      await promise.then(() => this.renderEnemy(enemy));
    })
  }

  renderEnemy = (enemy: EnemyT) => {
    this.game.enemiesQueue[enemy.id].isRendered = true;
    console.log( enemy );
  };

  get ctx() {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Boom');
    }
    return context;
  }

  get envStage() {
    return this.stage;
  }

  get envLayer() {
    return this.layer;
  }
}