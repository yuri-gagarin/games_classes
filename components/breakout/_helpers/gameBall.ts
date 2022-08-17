import { paddleWithBallContact } from "./collisionDectectors";
import { Player } from "./playerHud";
import type { BallData, KeyMap, PaddleData } from "./types";

export const ballData: BallData = {
  posX: 450,
  posY: 250,
  rad: 10,
  dX: 2,
  dY: 2
};

export class GameBall {
  private x: number;
  private y: number;
  private radius: number;
  private canvasCtx: CanvasRenderingContext2D;

  constructor(x: number, y: number, radius: number, canvasContext: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.canvasCtx = canvasContext;
  }

  draw(ballData: BallData) {
    this.canvasCtx.beginPath();
    this.canvasCtx.fillStyle = "red";
    this.canvasCtx.arc(ballData.posX, ballData.posY, this.radius, 0, 2 * Math.PI);
    this.canvasCtx.strokeStyle = "black";
    this.canvasCtx.lineWidth = 4;
    this.canvasCtx.fill();
    this.canvasCtx.stroke();
  }

  moveGameBall(ballData: BallData) {
    ballData.posX += ballData.dX;
    ballData.posY += ballData.dY;
  }

  watchForWallCollision(ballData: BallData) {
    if ((ballData.posY - ballData.rad) < 0 ) {
      ballData.dY *= -1;
    }
    if ((ballData.posX - ballData.rad) < 0 || (ballData.posX + ballData.rad > this.canvasCtx.canvas.width)) {
      ballData.dX *= -1;
    }
  };

  watchForPaddleMiss(ballData: BallData, player: Player,  pause: Function) {
    if (ballData.posY + ballData.rad >= this.canvasCtx.canvas.height) {
      player.decrementLife()
      pause()
    }
  }

  watchForPaddleCollision(ballData: BallData, paddleData: PaddleData, keyMap: KeyMap) {
    if (paddleWithBallContact(ballData, paddleData)) {
      if (keyMap.left || keyMap.right) {
        // speed up? //
        ballData.dY *= -1;
      } else {
        ballData.dY *= -1;
      }
    }
  };
};