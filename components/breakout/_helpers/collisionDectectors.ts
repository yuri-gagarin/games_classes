import type { BallData, PaddleData } from "./types";

export const paddleWithBallContact = (ballData: BallData, paddleData: PaddleData): boolean => {
  return (
    ballData.posX < paddleData.posX + paddleData.width &&
    ballData.posX > paddleData.posX &&
    ballData.posY < paddleData.posY + paddleData.height &&
    ballData.posY + ballData.rad > paddleData.posY
  )
};
export const paddleBallContactLeft = (ballData: BallData, paddleData: PaddleData): boolean => {
  const { posX: ballX, posY: ballY, rad } = ballData;
  const { posX: paddleX, posY: paddleY } = paddleData;
  return ballY + rad >= paddleY && ballX + rad === paddleX;
};
export const paddleBallContactRight = (ballData: BallData, paddleData: PaddleData): boolean => {
  const { posX: ballX, posY: ballY, rad } = ballData;
  const { posX: paddleX, posY: paddleY } = paddleData;
  return ballY + rad >= paddleY + 95 && ballX + rad === paddleX + 200;
};

export const ballContactFloor = (ballData: BallData): boolean => {
  const {  posY: ballY, rad } = ballData;
  return ballY + rad >= 300 // get some constants here///
};
