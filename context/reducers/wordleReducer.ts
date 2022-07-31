import type { WordleAction } from "../actions/wordle/wordleActions";
//
export type CharMap = { [key: string ]: number[] }
export type Pointer = { posX: number, posY: number; row: number };
export type WordleState = {
  gameState: "New" | "Won" | "GameOver";
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
  board: [],
  pastGuesses: [],
  targetWord: "RIGHT",
  //correctlyGuessedLetters: {},
  eliminatedRows: [],
  eliminatedLetters: [],
  incorrectInput: null
};

export default function wordleReducer(wordleState: WordleState = INIT_STATE, action: WordleAction): WordleState {
  switch(action.type) {
    case "GenerateBoard": {
      return {
        ...wordleState,
        ...action.payload,
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