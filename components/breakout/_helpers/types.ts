export type BallData = {
  posX: number; posY: number; rad: number; dX: number; dY: number;
};
export type BrickData = {
  posX: number; posY: number; shownOnScreen: boolean;
};
export type PaddleData = {
  posX: number;
  posY: number;
  dx: number;
  dy: number;
};
export type KeyMap = { left: boolean; right: boolean; up: boolean; down: boolean; }
