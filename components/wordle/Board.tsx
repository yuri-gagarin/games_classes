import React, { useEffect } from 'react';
import { Segment } from "semantic-ui-react";
// additional components //
import { Letter } from './Letter';
//
import { generateNewGameBoard } from '../../context/actions/wordle/wordleActions';
// css //
import styles from "../../styles/wordle/board/Board.module.css";
// types //
import type { Dispatch } from "react";
import type { WordleState } from '../../context/reducers/wordleReducer';
import type { WordleAction } from "../../context/actions/wordle/wordleActions";

interface IBoardProps {
  wordleState: WordleState;
  dispatch: Dispatch<WordleAction>;
}

export const Board: React.FunctionComponent<IBoardProps> = ({  wordleState, dispatch }): JSX.Element => {
  const { board } = wordleState;
  useEffect(() => {
    generateNewGameBoard(dispatch, 5, 5);
  }, []);

  // let's talk about how to make this more dynamic in class //
  if (board.length > 0) {
    return (
      <Segment style={{ border: "5px solid red"}}>
        <div className={ styles.boardRow }>
          <Letter board={ board } position={0} attempt={0} />
          <Letter board={ board } position={1} attempt={0} />
          <Letter board={ board } position={2} attempt={0} />
          <Letter board={ board } position={3} attempt={0} />
          <Letter board={ board } position={4} attempt={0} />
        </div>
        <div className={ styles.boardRow }>
          <Letter board={ board } position={0} attempt={1} />
          <Letter board={ board } position={1} attempt={1} />
          <Letter board={ board } position={2} attempt={1} />
          <Letter board={ board } position={3} attempt={1} />
          <Letter board={ board } position={4} attempt={1} />
        </div>
        <div className={ styles.boardRow }>
          <Letter board={ board } position={0} attempt={2} />
          <Letter board={ board } position={1} attempt={2} />
          <Letter board={ board } position={2} attempt={2} />
          <Letter board={ board } position={3} attempt={2} />
          <Letter board={ board } position={4} attempt={2} />
        </div>
        <div className={ styles.boardRow }>
          <Letter board={ board } position={0} attempt={3} />
          <Letter board={ board } position={1} attempt={3} />
          <Letter board={ board } position={2} attempt={3} />
          <Letter board={ board } position={3} attempt={3} />
          <Letter board={ board } position={4} attempt={3} />
        </div>
        <div className={ styles.boardRow }>
          <Letter board={ board } position={0} attempt={4} />
          <Letter board={ board } position={1} attempt={4} />
          <Letter board={ board } position={2} attempt={4} />
          <Letter board={ board } position={3} attempt={4} />
          <Letter board={ board } position={4} attempt={4} />
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

