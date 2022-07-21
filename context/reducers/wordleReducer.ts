import type { WordleAction } from "../actions/wordle/wordleActions";
//
export type WordleState = {
  board: string[][];
  targetWord: string;
  currentGuess: string;
};
export const INIT_STATE: WordleState = {
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
    default: return wordleState;
  }
};