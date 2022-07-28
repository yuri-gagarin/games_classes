import { generateBoard } from "../../../components/wordle/_helpers/wordleHelpers";
// types //
import type { Dispatch } from "react";
import type  { Pointer, WordleState } from "../../reducers/wordleReducer";


type GenerateBoard = {
  readonly type: "GenerateBoard";
  readonly payload: { board: string[][] };
};
type GuessWord = {
  readonly type: "GuessWord";
  readonly payload: { targetWord: string };
};
type EnterCharacter = {
  readonly type: "EnterCharacter";
  readonly payload: { cursor: { posX: number; posY: number }; board: string[][] };
};
type DeleteKeyPress = {
  readonly type: "DeleteKeyPress";
  readonly payload: { cursor: Pointer, board: string[][] }
};


export type WordleAction = GenerateBoard | GuessWord | EnterCharacter | DeleteKeyPress;

export const generateNewGameBoard = (dispatch: Dispatch<GenerateBoard>, cols: number, rows: number): void => {
  const board = generateBoard(cols, rows);
  return dispatch({ type: "GenerateBoard", payload: { board } });
};
export const guessWord = (dispatch: Dispatch<GuessWord>, word: string, currentState: WordleState): void => {

};

export const incrementPointer = (oldPtr: Pointer): Pointer => {
  const result: Pointer = { ...oldPtr };
  if (oldPtr.posX === 4 && oldPtr.posY === 4) {
    return result;
  } else {
    if (oldPtr.posX === 4) {
      result.posX = 0;
      result.posY += 1;
    } else {
      result.posX +=1;
    }
  }
  return result;
};

export const decrementPointer = (oldPtr: Pointer): Pointer => {
  const result: Pointer = { ...oldPtr };
  if (oldPtr.posX === 0 && oldPtr.posY === 0) {
    return result;
  } else {
    if (oldPtr.posX === 0) {
      // needs to be improved later //
      result.posX = 4;
      result.posY -= 1;
    } else {
      result.posX -= 1;
    }
  }
  return result;
};

export const deleteKeyPress = (dispatch: Dispatch<DeleteKeyPress>, currentState: WordleState): void => {
  const { posX, posY } = currentState.cursor;
  let updatedBoard: string[][] = [];
  if (posX === 0 && posY > 0) {
    updatedBoard = currentState.board.map((col, i) => {
      if (i === 4) {
        const inner: string[] = col.map((colVal, j) => {
          if (j === posY - 1) {
            return "0";
          } else {
            return colVal;
          }
        })
        return inner;
      } else {
        return [ ...col ];
      }
    })
  } else {
    updatedBoard = currentState.board.map((col, i) => {
      if (i === posX - 1) {
        const inner: string[] = col.map((colVal, j) => {
          if (j === posY) {
            return "0"
          } else {
            return colVal
          }
        });
        return inner;
      } else {
        return [ ...col ]
      }
    });
  }
  const updatedCursor = decrementPointer(currentState.cursor);
  return dispatch({ type: "DeleteKeyPress", payload: { cursor: updatedCursor, board: updatedBoard } });
};

export const enterLetter = (dispatch: Dispatch<EnterCharacter>, character: string, currentState: WordleState): void => {
  const { posX, posY } = currentState.cursor;
  // 
  if (posX === 4 && posY === 4) return;

  const updatedBoard: string[][] = currentState.board.map((col, i) => {
    if (i === posX) {
      const inner: string[] = col.map((colVal, j) => {
        if (j == posY) {
          return character;
        } else {
          return colVal;
        }
      })
      return inner;      
    } else {
      return [ ...col ]
    }
  });
  const updatedCursor = incrementPointer(currentState.cursor);
  return dispatch({ type: "EnterCharacter", payload: { cursor: updatedCursor, board: updatedBoard } });
};

