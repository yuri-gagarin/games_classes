import React, { useContext, useReducer } from 'react';
import { Grid } from "semantic-ui-react";
// additional components //
import { SnakeBoard } from '../../components/snake/Board';
import snakeReducer from '../../context/reducers/snakeReducer';
// context ///
import { SnakeContext } from '../../context/SnakeContext';

interface ISnakeIndexProps {
  
}

export const SnakeIndex: React.FunctionComponent<ISnakeIndexProps> = (props): JSX.Element => {
  // context //
  const initState = useContext(SnakeContext);
  const [ snakeState, dispatch ] = useReducer(snakeReducer, initState);
  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <SnakeBoard snakeState={ snakeState } dispatch={ dispatch } />
        </Grid.Column>
      </Grid.Row>
    </>
  )
  ;
};

export default SnakeIndex;
