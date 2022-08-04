import type { KeyMap, PaddleData } from "./types";;

export const paddleData: PaddleData = {
  posX: 10,
  posY: 280,
  dx: 10,
  dy: 1
};

export class Paddle {
  private posX: number; 
  private posY: number;
  private width: number;
  private height: number;
  private canvasCtx: CanvasRenderingContext2D

  constructor(posX: number, posY: number, width: number, height: number, canvasCtx: CanvasRenderingContext2D) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.canvasCtx = canvasCtx;
  }

  draw(paddleData: PaddleData) {
    this.canvasCtx.beginPath();
    this.canvasCtx.rect(paddleData.posX, paddleData.posY, this.width, this.height);
    this.canvasCtx.fillStyle = "blue";
    this.canvasCtx.strokeStyle = "white";
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.shadowBlur = 0;
    this.canvasCtx.shadowColor = "blue";
    this.canvasCtx.strokeRect(paddleData.posX, paddleData.posY, this.width, this.height);
    this.canvasCtx.fill();
  }
  movePaddle(keyMap: KeyMap, paddleData: PaddleData): void {
    if(keyMap.left && !this.hitWall(paddleData)) {
      paddleData.posX -= paddleData.dx
    } else if (keyMap.right && !this.hitWall(paddleData)) {
      paddleData.posX += paddleData.dx
    } else {
      return;
    }
  }
  private hitWall(paddleData: PaddleData): boolean {
    if (paddleData.posX + this.width >= this.canvasCtx.canvas.width) {
      paddleData.posX = this.canvasCtx.canvas.width - this.width - 1;
      return true;
    }
    if (paddleData.posX <= 0) {
      paddleData.posX = 1;
      return true; 
    }
    return false;
  }
};

