import { generateBoard } from "../../components/wordle/_helpers/wordleHelpers";
import type { WordleAction } from "../actions/wordle/wordleActions";
//
export type CharMap = { [key: string ]: number[] }
export type Pointer = { posX: number, posY: number; row: number };
export type GameState = "New" | "Playing" | "Won" | "GameOver";
export type WordleState = {
  gameState: GameState;
  cursor: Pointer;
  board: string[][];
  pastGuesses: string[];
  targetWord: string;
  // correctlyGuessedLetters: CharMap;
  eliminatedRows: number[];
  eliminatedLetters: string[];
  incorrectInput: { message: string } | null;
};
export const INIT_STATE: WordleState = {
  gameState: "New",
  cursor: { posX: 0, posY: 0, row: 0 },
  board: generateBoard(5, 5),
  pastGuesses: [],
  targetWord: "RIGHT",
  //correctlyGuessedLetters: {},
  eliminatedRows: [],
  eliminatedLetters: [],
  incorrectInput: null
};

export default function wordleReducer(wordleState: WordleState = INIT_STATE, action: WordleAction): WordleState {
  switch(action.type) {
    case "StartNewGame": {
      return {
        ...wordleState,
        gameState: action.payload.gameState,
      };
    }
    case "WonGame": {
      return {
        ...wordleState,
        gameState: action.payload.gameState
      };
    }
    case "ResetGameState": {
      return {
        ...wordleState,
        ...action.payload.newState
      };
    }
    case "ProcessGuess": {
      return {
        ...wordleState,
        pastGuesses: [ ...wordleState.pastGuesses, action.payload.guessedWord ],
        eliminatedLetters: [ ...action.payload.eliminatedLetters ],
        eliminatedRows: [ ...action.payload.eliminatedRows ]
      
        // correctlyGuessedLetters: { ...action.payload.correctlyGuessedLetters }
      };
    }
    case "EnterCharacter": {
      return {
        ...wordleState,
        cursor: { ...action.payload.cursor },
        board: [ ...action.payload.board ]
      };
    }
    case "DeleteKeyPress": {
      return {
        ...wordleState,
        cursor: { ...action.payload.cursor },
        board: [ ...action.payload.board ]
      };
    }
    case "SetIncorrectInput": {
      return {
        ...wordleState,
        incorrectInput: { ...action.payload }
      };
    }
    case "ClearIncorrectInput": {
      return {
        ...wordleState,
        incorrectInput: action.payload
      };
    }
    default: return wordleState;
  }
};