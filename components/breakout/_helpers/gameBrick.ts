export type BrickData = {
  posX: number; posY: number;
};

export class Brick {
  private posX: number;
  private posY: number;
  private width: number;
  private height: number;
  private canvasCtx: CanvasRenderingContext2D;

  constructor(posX: number, posY: number, width: number, height: number, canvasCtx: CanvasRenderingContext2D) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.canvasCtx = canvasCtx;
  }

  draw(brickData: BrickData) {
    this.canvasCtx.beginPath();
    this.canvasCtx.rect(brickData.posX, brickData.posY, this.width, this.height);
    this.canvasCtx.fillStyle = "orange";
    this.canvasCtx.strokeStyle = "white";
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.shadowBlur = 0;
    this.canvasCtx.shadowColor = "blue";
    this.canvasCtx.strokeRect(brickData.posX, brickData.posY, this.width, this.height);
    this.canvasCtx.fill();
  }

  get _posX(): number {
    return this.posX;
  }
  get _posY(): number {
    return this.posY;
  }
};

export const createBrickClasses = (numberOfBricks: number, canvasCtx: CanvasRenderingContext2D): { bricksList: Brick[]; bricksDataList: BrickData[]; } => {
  const bricksList: Brick[] = [];
  const bricksDataList: BrickData[] = [];

  let posX: number = 0; let posY: number = 0;

  for (let i = 1; i <= numberOfBricks; i++) {
    if (i % 5 === 0) {
      // begin a new line //
      const brick = new Brick(posX + 5, posY + 5, 90, 20, canvasCtx);
      bricksList.push(brick);
      bricksDataList.push({ posX: brick._posX, posY: brick._posY });
      posX = 0;
      posY += 30;
    } else {
      const brick = new Brick(posX + 5, posY + 5, 90, 20, canvasCtx);
      bricksList.push(brick);
      bricksDataList.push({ posX: brick._posX, posY: brick._posY })
      posX += 100;
    }
  }
  return { bricksList, bricksDataList };
}

export const drawBricks = (bricksDataList: BrickData[], bricksClasses: Brick[]): void => {
  for (let i = 0; i < bricksDataList.length; i++) {
    bricksClasses[i].draw(bricksDataList[i])
  }
}
