import { Dispatch } from "react";
import { generateBoard } from "../../../components/wordle/_helpers/wordleHelpers";

type GenerateBoard = {
  readonly type: "GenerateBoard";
  readonly payload: { board: string[][] };
};
type GuessWord = {
  readonly type: "GuessWord";
  readonly payload: { targetWord: string };
}

export type WordleAction = GenerateBoard | GuessWord;

export const generateNewGameBoard = (dispatch: Dispatch<GenerateBoard>, cols: number, rows: number): void => {
  const board = generateBoard(cols, rows);
  return dispatch({ type: "GenerateBoard", payload: { board } });
};
export const guessWord = (dispatch: Dispatch<GuessWord>, word: string): void => {

};
