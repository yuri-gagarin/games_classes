export type PaddleData = {
  posX: number;
  posY: number;
  dx: number;
  dy: number;
};

export const paddleData: PaddleData = {
  posX: 10,
  posY: 200,
  dx: 10,
  dy: 1
};

export class Paddle {
  private posX: number; 
  private posY: number;
  private width: number;
  private height: number;

  constructor(posX: number, posY: number, width: number, height: number) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
  }

  draw(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.beginPath();
    canvasCtx.rect(this.posX, this.posY, this.width, this.height);
    canvasCtx.fillStyle = "white";
    canvasCtx.strokeStyle = "white";
    canvasCtx.lineWidth = 2;
    canvasCtx.shadowBlur = 0;
    canvasCtx.shadowColor = "blue";
    canvasCtx.strokeRect(this.posX, this.posY, this.width, this.height);
    canvasCtx.fill();
  }
};

