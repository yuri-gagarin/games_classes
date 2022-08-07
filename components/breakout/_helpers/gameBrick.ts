import type { BallData, BrickData } from "./types";

export class Brick {
  private posX: number;
  private posY: number;
  private width: number;
  private height: number;
  private canvasCtx: CanvasRenderingContext2D;
  private visible: boolean  = true;
  private hits: number = 0;

  constructor(posX: number, posY: number, width: number, height: number, canvasCtx: CanvasRenderingContext2D) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.canvasCtx = canvasCtx;
  }

  draw() {
    if (this._hits < 4) {
      const color: string = this._hits === 0 ? "white" : (this._hits === 1 ? "orange" : "red")
      this.canvasCtx.beginPath();
      this.canvasCtx.rect(this.posX, this.posY, this.width, this.height);
      this.canvasCtx.fillStyle = color
      this.canvasCtx.strokeStyle = "white";
      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.shadowBlur = 0;
      this.canvasCtx.shadowColor = "blue";
      this.canvasCtx.strokeRect(this.posX, this.posY, this.width, this.height);
      this.canvasCtx.fill();
    } else {
      return;
    }
    
  };

  setBallCollisionDectector(ballData: BallData) {
    if (!this.visible) return;

    const distanceX = Math.abs(ballData.posX - this.posX - this.width / 2);
    const distanceY = Math.abs(ballData.posY - this.posY - this.height / 2);

    console.log(distanceY)

    if (distanceX <= this.width / 2 || distanceY <= this.height / 2) {
      this.hits += 1;
      ballData.dY *= -1;
      if (this.hits === 3) this.visible = false;
    }

    /*
    const { posX: ballX, posY: ballY, rad } = ballData;
    if (ballY - rad === this.posY + this.height && ballX + rad >= this.posX && ballX + rad <= this.posX + this.width) {
      this.hits += 1;
      ballData.dY *= -1;
      if (this.hits === 3) this.visible = false;
    }
    */
  }

  get _posX(): number {
    return this.posX;
  }
  get _posY(): number {
    return this.posY;
  }

  get _visible(): boolean {
    return this.visible;
  }
  get _hits(): number {
    return this.hits;
  }
};

export const createBrickClasses = (numberOfBricks: number, canvasCtx: CanvasRenderingContext2D): { bricksList: Brick[]; } => {
  const bricksList: Brick[] = [];
  // const bricksDataList: BrickData[] = [];

  let posX: number = 0; let posY: number = 0;

  for (let i = 1; i <= numberOfBricks; i++) {
    if (i % 5 === 0) {
      // begin a new line //
      const brick = new Brick(posX + 5, posY + 5, 90, 20, canvasCtx);
      bricksList.push(brick);
      //  bricksDataList.push({ posX: brick._posX, posY: brick._posY, hits: 0, shownOnScreen: true });
      posX = 0;
      posY += 30;
    } else {
      const brick = new Brick(posX + 5, posY + 5, 90, 20, canvasCtx);
      bricksList.push(brick);
      // bricksDataList.push({ posX: brick._posX, posY: brick._posY, hits: 0,  shownOnScreen: true });
      posX += 100;
    }
  }
  return { bricksList };
}

export const drawBricks = (bricks: Brick[]): void => {
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i]._visible) {
      bricks[i].draw();
    }
  }
};

