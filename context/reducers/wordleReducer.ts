import type { WordleAction } from "../actions/wordle/wordleActions";
//
export type Pointer = { posX: number, posY: number };
export type WordleState = {
  cursor: Pointer;
  board: string[][];
  targetWord: string;
  currentGuess: string;
};
export const INIT_STATE: WordleState = {
  cursor: { posX: 0, posY: 0 },
  board: [],
  targetWord: "",
  currentGuess: ""
};

export default function wordleReducer(wordleState: WordleState = INIT_STATE, action: WordleAction): WordleState {
  switch(action.type) {
    case "GenerateBoard": {
      return {
        ...wordleState,
        ...action.payload,
      };
    }
    case "GuessWord": {
      return {
        ...wordleState,
        ...action.payload
      };
    }
    case "EnterCharacter": {
      return {
        ...wordleState,
        cursor: { ...action.payload.cursor },
        board: [ ...action.payload.board ]
      }
    }
    case "DeleteKeyPress": {
      return {
        ...wordleState,
        cursor: { ...action.payload.cursor },
        board: [ ...action.payload.board ]
      }
    }
    default: return wordleState;
  }
};