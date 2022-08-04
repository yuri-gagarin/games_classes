export type BallData = {
  x: number; y: number; rad: number; dx: number; dy: number;
}

export const ballData: BallData = {
  x: 60,
  y: 40,
  rad: 10,
  dx: 1,
  dy: 1
};

export class GameBall {
  private x: number;
  private y: number;
  private radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(canvasContext: CanvasRenderingContext2D) {
    canvasContext.beginPath();
    canvasContext.fillStyle = "red";
    canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fill();
    canvasContext.stroke();
  }
};

export const moveGameBall = (canvasCtx: CanvasRenderingContext2D, ballData: BallData) => {
  let gameBall = new GameBall(ballData.x, ballData.y, ballData.rad);
  gameBall.draw(canvasCtx);
  ballData.x += ballData.dx;
  ballData.y += ballData.dy;
  
}
