import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Grid } from "semantic-ui-react";
// additional components //
import { Board } from '../../components/wordle/Board';
import { Keyboard } from '../../components/wordle/Keyboard';
// context ///
import { WordleContextProvider } from '../../context/WordleContext';
import wordleReducer, { INIT_STATE } from '../../context/reducers/wordleReducer';
import { generateNewGameBoard } from '../../context/actions/wordle/wordleActions';

interface IWordleIndexProps {
  
}

export const WordleIndex: React.FunctionComponent<IWordleIndexProps> = (props): JSX.Element => {
  // context //
  const [ wordleState, dispatch ] = useReducer(wordleReducer, INIT_STATE);

  useEffect(() => {
    generateNewGameBoard(dispatch, 5, 5);
  }, []);

  useEffect(() => {
    console.log(wordleState);
  }, [ wordleState ])

  return (
    <WordleContextProvider>
      <Grid.Row>
        <Grid.Column>
          <Board 
            wordleState={ wordleState }
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Keyboard />
        </Grid.Column>
      </Grid.Row>
    </WordleContextProvider>
  )
  ;
};

export default WordleIndex;
