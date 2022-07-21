import { createContext } from "react";
import { INIT_STATE } from "./reducers/wordleReducer";
//
import type { PropsWithChildren } from "react";
import type { WordleState } from "./reducers/wordleReducer";

interface IWordleContextProviderProps extends PropsWithChildren {};

export const WordleContext = createContext<WordleState>(INIT_STATE);

export const WordleContextProvider: React.FC<IWordleContextProviderProps> = ({ children }): JSX.Element => {
  return (
    <WordleContext.Provider value={INIT_STATE}>
      { children }
    </WordleContext.Provider>
  )
};
