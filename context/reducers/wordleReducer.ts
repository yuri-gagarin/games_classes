import type { WordleAction } from "../actions/wordle/wordleActions";
//
export type Pointer = { posX: number, posY: number; row: number };
export type WordleState = {
  cursor: Pointer;
  board: string[][];
  pastGuesses: string[];
  targetWord: string;
};
export const INIT_STATE: WordleState = {
  cursor: { posX: 0, posY: 0, row: 0 },
  board: [],
  pastGuesses: [],
  targetWord: "",
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
        pastGuesses: [ ...wordleState.pastGuesses, action.payload.targetWord ]
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
    default: return wordleState;
  }
};