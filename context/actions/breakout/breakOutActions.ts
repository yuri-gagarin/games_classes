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
export type DecrementLives = {
  readonly type: "DecrementLives";
  readonly payload: { lives: number };
};

export type BreakOutAction = SetGameState | IncrementScore | DecrementLives;

export const startNewGame = (dispatch: Dispatch<BreakOutAction>) => {
  dispatch({ type: "SetGameState", payload: { gameState: "Playing" } });
};
export const pauseGame = (dispatch: Dispatch<BreakOutAction>) => {
  dispatch({ type: "SetGameState", payload: { gameState: "Paused" } });
};
export const endGame = (dispatch: Dispatch<BreakOutAction>) => {
  dispatch({ type: "SetGameState", payload: { gameState: "GameOver" } });
};
export const winGame = (dispatch: Dispatch<BreakOutAction>) => {
  dispatch({ type: "SetGameState", payload: { gameState: "Won" } });
};

export const incrementScore = (dispatch: Dispatch<BreakOutAction>, score: number): void => {
  dispatch({ type: "IncrementScore", payload: { score } });
};
export const decrementLives = (dispatch: Dispatch<BreakOutAction>, lives: number): void => {
  dispatch({ type: "DecrementLives", payload: { lives } });
}