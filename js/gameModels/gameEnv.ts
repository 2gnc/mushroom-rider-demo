import Konva from 'konva';

export class Environment {
  private canvas: HTMLCanvasElement;
  private stage: Konva.Stage;
  private layer: Konva.Layer;
  private deadlineAxis: number;

  constructor(width: number, height: number, deadlineAxis: number) {
    console.log({deadlineAxis, height})
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

  get envStage() {
    return this.stage;
  }

  get envLayer() {
    return this.layer;
  }
}