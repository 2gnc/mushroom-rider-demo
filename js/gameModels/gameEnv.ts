import Konva from 'konva';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import size from 'lodash/size';
import values from 'lodash/values';

import { Game, GameLifesycleEnum } from './game';
import { EnemyT } from './enemy';

export const ENEMY_UPDATE_INTERVAL = 1000;
const ANIMATION_VELOCITY = 50;
export class Environment {
  private canvas: HTMLCanvasElement;
  private stage: Konva.Stage;
  private deadlineAxis: number;
  private game: Game;
  private loop: NodeJS.Timeout | null;

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
    this.game = game;
    this.loop = null;
  }
  
  initialize() {
    document.body.appendChild(this.canvas);
    this.loop = setInterval(() => {
      this.queueEnemiesToRender();
    }, ENEMY_UPDATE_INTERVAL);
  }

  queueEnemiesToRender = () => {
    const toRender = filter(values(this.game.enemiesQueue), (enemy) => !enemy.isQueuedToRender);
    if (!size(toRender)) {
      return;
    }

    forEach(toRender, (enemy) => {
      enemy.isQueuedToRender = true;
      const promise = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, enemy.spawnTimeout)
      });
      promise.then(() => this.renderEnemy(enemy));
    })
  }

  renderEnemy = (enemy: EnemyT) => {
    if (this.game.lifesycleState !== GameLifesycleEnum.playing) {
      return;
    }
    this.game.enemiesQueue[enemy.id].isRendered = true;
    delete this.game.enemiesQueue[enemy.id];

    const layer = new Konva.Layer();

    const imageObj = new Image();
    const image = new Konva.Image({
      x: enemy.area.x,
      y: enemy.area.y,
      image: imageObj,
      width: 55,
      height: 55,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: { x: 5, y: 5 },
      shadowOpacity: 0.3,
    });
    layer.add(image);

    const distance = 300;
    const duration = 6 * 1000;

    const animation = new Konva.Animation((frame) => {
      if (!frame) {
        return;
      }
      image.y(
        distance * Math.sin((frame.time * 2 * Math.PI) / duration) + enemy.area.y
      );
    }, layer)

    const growA = new Konva.Tween({
      node: image,
      duration: 0.8,
      scaleX: 3,
      scaleY: 3,
    });

    const fadeA = new Konva.Tween({
      node: image,
      duration: 0.2,
      opacity: 0,
    });

    const handleDamage = () => {
      fadeA.play();
        fadeA.onFinish = () => {
        this.getDamage(enemy, image, layer);
        this.game.updateScore();
      };
    };

    const handleDestroy = () => {
      fadeA.play();
      fadeA.onFinish = () => {
        this.destroyEnemy(image, enemy, layer);
        image.off('pointerclick', handleDestroy);
        clearTimeout(timeout);
        this.game.updateScore(enemy.bonus);
      }
    };

    imageObj.onload = () => {
      image.on('pointerclick', handleDestroy);
      
      growA.play();
      animation.start();
      setTimeout(() => {
        animation.stop()
      }, duration / 5)
    };
    
    imageObj.src = `./mushrooms/${enemy.image}.png`;
    this.stage.add(layer);

    const timeout = setTimeout(handleDamage, duration / 5);

    

  };

  getDamage = (enemy: EnemyT, image: Konva.Image, layer: Konva.Layer) => {
    this.game.score.health = this.game.score.health - enemy.hit;
    this.destroyEnemy(image, enemy, layer);
  }
  
  destroyEnemy = (obj: Konva.Image, enemy: EnemyT, layer: Konva.Layer) => {
    obj.destroy();
    layer.remove();
    this.game.clearOccupiedAreas(enemy.id);
    this.game.populateEnemiesLoop();
  }

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

  stopLooping = () => {
    if (!this.loop) {
      return;
    }
    clearInterval(this.loop);
    this.loop = null;
  }
}