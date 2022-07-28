import React, { useEffect, useRef, useState } from 'react';
import { Segment } from "semantic-ui-react";
// additional components //
import { Letter } from './Letter';
//
import { generateNewGameBoard } from '../../context/actions/wordle/wordleActions';
// helpers //
import { validateGuessedWord } from './_helpers/wordleHelpers';
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
  const rowRef = useRef<number>(wordleState.cursor.row);
  const [ rowHighlighted, setRowHighlited ] = useState<{ row: number | null; }>({ row: null })
  const { board } = wordleState;

  useEffect(() => {
    generateNewGameBoard(dispatch, 5, 5);
  }, []);

  useEffect(() => {
    /*
    const { row: newRow } = wordleState.cursor;
    if (newRow > rowRef.current) {
      console.log("Now row is: " + newRow);
      rowRef.current += 1;
    }
    */
    const { board, cursor} = wordleState;
    const { valid } = validateGuessedWord(board, rowRef.current);
    if (valid) {
      setRowHighlited({ row: rowRef.current });
    } else {
      setRowHighlited({ row: null });
    }
  }, [ wordleState]);

  // let's talk about how to make this more dynamic in class //
  if (board.length > 0) {
    return (
      <Segment style={{ border: "5px solid red", display: "flex", justifyContent: "center" }}>
        <div className={ styles.inner }>
          <div className={ `${styles.boardRow} ${rowHighlighted.row === 0 && styles.rowHighlighted }` }>
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

