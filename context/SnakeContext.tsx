import { createContext } from "react";
import { INIT_STATE } from "./reducers/snakeReducer";
//
import type { PropsWithChildren } from "react";
import type { SnakeState } from "./reducers/snakeReducer";

interface ISnakeContextProviderProps extends PropsWithChildren {};

export const SnakeContext = createContext<SnakeState>(INIT_STATE);

export const SnakeContextProvider: React.FC<ISnakeContextProviderProps> = ({ children }): JSX.Element => {
  return (
    <SnakeContext.Provider value={INIT_STATE}>
      { children }
    </SnakeContext.Provider>
  )
};
