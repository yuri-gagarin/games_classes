import React, { useState } from 'react';
import { Segment } from "semantic-ui-react";
// additional components //
import { Letter } from './Letter';
// css //
import styles from "../../styles/wordle/board/Board.module.css";
// types //
import type { WordleState } from '../../context/reducers/wordleReducer';

interface IBoardProps {
  wordleState: WordleState
}

export const Board: React.FunctionComponent<IBoardProps> = ({ wordleState }): JSX.Element => {
  const gameBoard = wordleState.board;
  // let's talk about how to make this more dynamic in class //
  if (wordleState.board.length > 0) {
    return (
      <Segment style={{ border: "5px solid red"}}>
        <div className={ styles.boardRow }>
          <Letter board={ gameBoard } position={0} attempt={0} />
          <Letter board={ gameBoard } position={1} attempt={0} />
          <Letter board={ gameBoard } position={2} attempt={0} />
          <Letter board={ gameBoard } position={3} attempt={0} />
          <Letter board={ gameBoard } position={4} attempt={0} />
        </div>
        <div className={ styles.boardRow }>
          <Letter board={ gameBoard } position={0} attempt={1} />
          <Letter board={ gameBoard } position={1} attempt={1} />
          <Letter board={ gameBoard } position={2} attempt={1} />
          <Letter board={ gameBoard } position={3} attempt={1} />
          <Letter board={ gameBoard } position={4} attempt={1} />
        </div>
        <div className={ styles.boardRow }>
          <Letter board={ gameBoard } position={0} attempt={2} />
          <Letter board={ gameBoard } position={1} attempt={2} />
          <Letter board={ gameBoard } position={2} attempt={2} />
          <Letter board={ gameBoard } position={3} attempt={2} />
          <Letter board={ gameBoard } position={4} attempt={2} />
        </div>
        <div className={ styles.boardRow }>
          <Letter board={ gameBoard } position={0} attempt={3} />
          <Letter board={ gameBoard } position={1} attempt={3} />
          <Letter board={ gameBoard } position={2} attempt={3} />
          <Letter board={ gameBoard } position={3} attempt={3} />
          <Letter board={ gameBoard } position={4} attempt={3} />
        </div>
        <div className={ styles.boardRow }>
          <Letter board={ gameBoard } position={0} attempt={4} />
          <Letter board={ gameBoard } position={1} attempt={4} />
          <Letter board={ gameBoard } position={2} attempt={4} />
          <Letter board={ gameBoard } position={3} attempt={4} />
          <Letter board={ gameBoard } position={4} attempt={4} />
        </div>
      </Segment>
    );
  } else {
    return (
      <Segment>
        <>Generate New Game</>
      </Segment>
    );
  }
};

