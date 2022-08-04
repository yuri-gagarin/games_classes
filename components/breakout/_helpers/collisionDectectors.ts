import type { BallData, PaddleData } from "./types";

export const paddleBallContactTop = (ballData: BallData, paddleData: PaddleData): boolean => {
  const { posX: ballX, posY: ballY, rad } = ballData;
  const { posX: paddleX, posY: paddleY } = paddleData;
  return ballY + rad >= paddleY && ballX >= paddleX && ballX <= paddleX + 100;
};
export const paddleBallContactLeft = (ballData: BallData, paddleData: PaddleData): boolean => {
  const { posX: ballX, posY: ballY, rad } = ballData;
  const { posX: paddleX, posY: paddleY } = paddleData;
  return ballY + rad >= paddleY + 95 && ballX + rad >= paddleX;
};
export const paddleBallContactRight = (ballData: BallData, paddleData: PaddleData): boolean => {
  const { posX: ballX, posY: ballY, rad } = ballData;
  const { posX: paddleX, posY: paddleY } = paddleData;
  return ballY + rad >= paddleY + 95 && ballX + rad <= paddleX + 200;
};

export const ballContactFloor = (ballData: BallData): boolean => {
  const {  posY: ballY, rad } = ballData;
  return ballY + rad >= 300 // get some constants here///
};
