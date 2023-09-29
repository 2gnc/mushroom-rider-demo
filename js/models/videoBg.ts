export class VideoBg {
  video: HTMLVideoElement;
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.video = document.createElement('video');
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'gameBg';
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
  }
    
  initialize() {
    document.body.appendChild(this.canvas);
    this.video.src = './bg.mp4';
    this.video.addEventListener('loadedmetadata', () => {
    this.video.muted = true;
    this.video.loop = true;
    this.update();
  });
  }

  update = () => {
    const frameOffsetX = (this.video.videoWidth / 2) - (this.width / 2) + 150;
    const videoRatio = this.video.videoWidth / this.video.videoHeight;
    const viewportRatio = this.width / this.height;
    const deltaHeight = this.height - this.video.videoHeight;
    const deltaHeightPers = deltaHeight / (this.video.videoHeight / 100);

    this.canvas?.getContext('2d')?.drawImage(
      this.video, 
      frameOffsetX,
      0,
      this.height,
      this.width,
      0,
      0,
      this.video.videoWidth + (this.video.videoWidth / 100 * deltaHeightPers),
      this.height,
    );
    requestAnimationFrame(this.update);
  }

  pause() {
    this.video.pause();
  }

  play() {
    this.video.play();
  }
}