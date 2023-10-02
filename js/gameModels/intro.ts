export class Intro {
  private canvas: HTMLCanvasElement;
  private header: HTMLElement | null;
  private subheader: HTMLElement | null;
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
    this.subheader = null;
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

  clear() {
    if (this.header) {
      document.body.removeChild(this.header);
    }
    if (this.subheader) {
      document.body.removeChild(this.subheader);
    }
    if (this.button) {
      document.body.removeChild(this.button);
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw = (handleStart: () => void) => {
    const image = new Image();
    image.src = './introBg.jpg';
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, this.width, this.height);
    }

    const header = document.createElement('div');
    header.innerText = 'Mushroom Rider';
    header.className = 'gameHeader';
    document.body.appendChild(header);
    this.header = header;

    const subheader = document.createElement('div');
    subheader.innerText = 'Eat mushrooms or they will eat you';
    subheader.className = 'gameSubheader';
    document.body.appendChild(subheader);
    this.subheader = subheader;

    const button = document.createElement('div');
    button.innerText = 'GO!';
    button.className = 'startButton';
    document.body.appendChild(button);
    button.onclick = handleStart;
    this.button = button;
  }
}