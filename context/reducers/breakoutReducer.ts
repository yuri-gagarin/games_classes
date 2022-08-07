
export type GameState = "New" | "Playing" | "Won" | "GameOver";
export type BreakOutState = {
  gameState: GameState;
  difficulty: 1 | 2 | 3 | 4;
  score: number;

};
export const INIT_STATE: BreakOutState = {
  gameState: "New",
  difficulty: 1,
  score: 0
};

export default function BreakOutReducer(BreakOutState: BreakOutState = INIT_STATE, action: any): BreakOutState {
  
  }
};