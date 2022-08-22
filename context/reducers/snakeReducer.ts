import { GameState, SnakeAction } from "../actions/snake/snakeActions";

export type SnakeState = {
  gameState: GameState;
  difficulty: 1 | 2 | 3 | 4;
  score: number;
  lives: number;
};
export const INIT_STATE: SnakeState = {
  gameState: "NewGame",
  difficulty: 1,
  score: 0,
  lives: 5
};

export default function SnakeReducer(state: SnakeState = INIT_STATE, action: SnakeAction): SnakeState {
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
    default: return state;
  }
};