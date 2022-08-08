import { GameState, BreakOutAction } from "../actions/breakout/breakOutActions";

export type BreakOutState = {
  gameState: GameState;
  difficulty: 1 | 2 | 3 | 4;
  score: number;
  lives: number;
};
export const INIT_STATE: BreakOutState = {
  gameState: "NewGame",
  difficulty: 1,
  score: 0,
  lives: 5
};

export default function BreakOutReducer(state: BreakOutState = INIT_STATE, action: BreakOutAction): BreakOutState {
  const { type, payload } = action;
  switch (type) {
    case "SetGameState": {
      return {
        ...state,
        ...action.payload
      };
    }
    case "IncrementScore": {
      return {
        ...state,
        score: state.score + action.payload.score
      };
    }
    case "DecrementLives": {
      return {
        ...state,
        lives: state.lives = action.payload.lives
      };
    }
    default: return state;
  }
};