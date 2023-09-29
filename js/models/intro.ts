export class Intro {
  private canvas: HTMLCanvasElement;
  private header: HTMLElement | null;
  private button: HTMLElement | null;
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.className = 'gameIntro';
    this.header = null;
    this.button = null;
    this.width = width;
    this.height = height;
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

  drawIntro = () => {
    const image = new Image();
    image.src = './introBg.jpg';
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, this.width, this.height);
    }

    const header = document.createElement('div');
    header.innerText = 'NDA Rider';
    header.className = 'gameHeader';
    document.body.appendChild(header);
    this.header = header;
  }

  clear() {
    if (this.header) {
      document.body.removeChild(this.header);
    }
    if (this.button) {
      document.body.removeChild(this.button);
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw = (handleStart: () => void) => {
    this.drawIntro();
    const button = document.createElement('div');
    button.innerText = 'start';
    button.className = 'startButton';
    document.body.appendChild(button);
    button.onclick = handleStart;
    this.button = button;
  }
}