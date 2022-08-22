import type { Dispatch } from "react";

export type GameState =  "NewGame" | "Playing" | "Paused" | "Won" | "GameOver";

export type SetGameState = {
  readonly type: "SetGameState";
  readonly payload: { gameState: GameState };
};
export type IncrementScore = {
  readonly type: "IncrementScore";
  readonly payload: { score: number };
};


export type SnakeAction = SetGameState | IncrementScore;

export const startNewGame = (dispatch: Dispatch<SnakeAction>) => {
  dispatch({ type: "SetGameState", payload: { gameState: "Playing" } });
};
export const pauseGame = (dispatch: Dispatch<SnakeAction>) => {
  dispatch({ type: "SetGameState", payload: { gameState: "Paused" } });
};
export const endGame = (dispatch: Dispatch<SnakeAction>) => {
  dispatch({ type: "SetGameState", payload: { gameState: "GameOver" } });
};
export const winGame = (dispatch: Dispatch<SnakeAction>) => {
  dispatch({ type: "SetGameState", payload: { gameState: "Won" } });
};

export const incrementScore = (dispatch: Dispatch<SnakeAction>, score: number): void => {
  dispatch({ type: "IncrementScore", payload: { score } });
};
