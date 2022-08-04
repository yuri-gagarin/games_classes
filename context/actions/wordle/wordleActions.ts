import { generateBoard, getDefaultGameState, returnEliminatedLetters, validateGuessedWord } from "../../../components/wordle/_helpers/wordleHelpers";
// types //
import type { Dispatch } from "react";
import type { GameState, Pointer, WordleState } from "../../reducers/wordleReducer";


type ResetGameState = {
  readonly type: "ResetGameState";
  readonly payload: { newState: WordleState };
};
type ProcessGuess = {
  readonly type: "ProcessGuess";
  readonly payload: { eliminatedLetters: string[]; eliminatedRows: number[]; guessedWord: string; };
};
type EnterCharacter = {
  readonly type: "EnterCharacter";
  readonly payload: { cursor: Pointer; board: string[][] };
};
type DeleteKeyPress = {
  readonly type: "DeleteKeyPress";
  readonly payload: { cursor: Pointer, board: string[][] }
};
type SetIncorrectInput = {
  readonly type: "SetIncorrectInput";
  readonly payload: { message: string };
};
type ClearIncorrectInput = {
  readonly type: "ClearIncorrectInput";
  readonly payload: null // we can build on this.. sure //
};

type StartNewGame = {
  readonly type: "StartNewGame";
  readonly payload: { gameState: GameState }
};
type GiveUp = {
  readonly type: "GiveUp";
  readonly payload: { gameState: GameState };
};
type WonGame = {
  readonly type: "WonGame";
  readonly payload: { gameState: GameState};
};
type LostGame = {
  readonly type: "LostGame";
  readonly payload: { gameState: GameState};
};

export const ensureDeleteIsAllowed = (wordleState: WordleState): boolean => {
  const { cursor, pastGuesses } = wordleState;
  if (cursor.row === pastGuesses.length && cursor.posX === 0) {
    return false;
  } else {
    return true;
  }
};

export type WordleAction = ResetGameState | ProcessGuess | EnterCharacter | DeleteKeyPress | SetIncorrectInput | ClearIncorrectInput | StartNewGame | GiveUp | WonGame | LostGame;

export const resetGameState = (dispatch: Dispatch<ResetGameState>, cols: number, rows: number): void => {
  const gamestate = getDefaultGameState();
  return dispatch({ type: "ResetGameState", payload: { newState: gamestate } });
};

export const guessWord = (dispatch: Dispatch<ProcessGuess | SetIncorrectInput | WonGame | LostGame>, currentState: WordleState): void => {
  // alright 
  const { pastGuesses, board, cursor, targetWord, eliminatedLetters, eliminatedRows } = currentState;
  if ((cursor.posX === 0 && cursor.posY > 0) && (pastGuesses.length < cursor.row)) {
    const { valid, word } = validateGuessedWord(board, cursor.row - 1);
    if (word === targetWord) {
      dispatch({ type: "WonGame", payload: { gameState: "Won" } });
    }
    const updatedEliminatedLetters: string[] = returnEliminatedLetters(word, targetWord, eliminatedLetters);
    if (valid && word.length === 5) {
      dispatch({ 
        type: "ProcessGuess",
        payload: { 
          guessedWord: word, 
          eliminatedRows: [ ...eliminatedRows, cursor.row - 1],
          eliminatedLetters: [ ...updatedEliminatedLetters ]
        } 
      });
    } 
  } else if (cursor.posX === 5 && cursor.posY === 4) {
    // end of the road //
    const { valid, word } = validateGuessedWord(board, cursor.row);
    if (word === targetWord) {
      dispatch({ type: "WonGame", payload: { gameState: "Won" } });
    } else {
      dispatch({ type: "LostGame", payload: { gameState: "GameOver" } });
    }
  } else {
    console.log(cursor.posX, cursor.posY)
    dispatch({ type: "SetIncorrectInput", payload: { message: "Type in a word first champ" } });
    return;
  }
};

export const incrementPointer = (oldPtr: Pointer): Pointer => {
  const result: Pointer = { ...oldPtr };
  if (oldPtr.posX === 4 && oldPtr.posY === 4) {
    result.posX += 1;
  } else if (oldPtr.posX === 4 && oldPtr.posY < 4) {
    result.posX = 0;
    result.posY += 1;
    result.row += 1;
  } else if (oldPtr.posX < 4 && oldPtr.posY <= 4) {
    result.posX += 1
  } else {
    return oldPtr;
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
      result.row -= 1;
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
            return "";
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
            return ""
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

export const enterLetter = (dispatch: Dispatch<EnterCharacter | SetIncorrectInput>, character: string, currentState: WordleState): void => {
  const { cursor, pastGuesses } = currentState;
  const { posX, posY, row } = cursor;
  // 
  //if (posX === 4 && posY === 4) return;
  if (posY > 0 && posX === 0 && row !== pastGuesses.length) {
    return dispatch({ type: "SetIncorrectInput", payload: { message: "Press ENTER to guess a word first" } });
  }

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

