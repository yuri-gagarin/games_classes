import React, { useContext, useReducer } from 'react';
import { Grid } from "semantic-ui-react";
// additional components //
import { Board } from '../../components/wordle/Board';
import { Keyboard } from '../../components/wordle/Keyboard';
import wordleReducer from '../../context/reducers/wordleReducer';
// context ///
import { WordleContext } from '../../context/WordleContext';

interface IWordleIndexProps {
  
}

export const WordleIndex: React.FunctionComponent<IWordleIndexProps> = (props): JSX.Element => {
  // context //
  const initState = useContext(WordleContext);
  const [ wordleState, dispatch ] = useReducer(wordleReducer, initState);
  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <Board wordleState={ wordleState } dispatch={ dispatch } />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Keyboard wordleState={ wordleState } dispatch={ dispatch } />
        </Grid.Column>
      </Grid.Row>
    </>
  )
  ;
};

export default WordleIndex;
