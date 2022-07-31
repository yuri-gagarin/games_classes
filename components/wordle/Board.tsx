import React, { useEffect, useRef, useState } from 'react';
import { Segment } from "semantic-ui-react";
// additional components //
import { HelperComponent } from './HelperComponent';
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
import GameEndScreen from './GameEndScreen';

interface IBoardProps {
  wordleState: WordleState;
  dispatch: Dispatch<WordleAction>;
}

function dismissMessageWithTimeout(state: WordleState, dispatch: Dispatch<WordleAction>, delay?: number): NodeJS.Timeout {
  const [ localState, setLocalState ] = useState<{ timeout: NodeJS.Timeout }>({ timeout: setTimeout(() =>{}) });
  useEffect(() => {
    if (state.incorrectInput) {
      clearTimeout(localState.timeout);
      setLocalState({ 
        timeout: setTimeout(() => {
          dispatch({ type: "ClearIncorrectInput", payload: null })
        }, delay || 1000)
      })
    } else {
      clearTimeout(localState.timeout);
    }
    return () => clearTimeout(localState.timeout);
  }, [ state ]);

  return localState.timeout;
} 

export const Board: React.FunctionComponent<IBoardProps> = ({  wordleState, dispatch }): JSX.Element => {
  // local
  const rowRef = useRef<number>(wordleState.cursor.row);
  const [ rowHighlighted, setRowHighlited ] = useState<{ row: number | null; }>({ row: null });
  const inputTimeout = dismissMessageWithTimeout(wordleState, dispatch, 5000)
  //
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

  useEffect(() =>  {
    if (wordleState.pastGuesses.length > rowRef.current) {
      rowRef.current += 1;
      setRowHighlited({ row: null });
    }
  }, [ wordleState.pastGuesses, rowRef, setRowHighlited ]);

  // let's talk about how to make this more dynamic in class //
  if (board.length > 0) {
    return (
      <Segment style={{ position: "relative", border: "5px solid red", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <HelperComponent visible={ wordleState.incorrectInput ? true : false } message={ wordleState.incorrectInput && wordleState.incorrectInput.message } />
        <GameEndScreen wordleState={ wordleState } />
        <div className={ styles.inner }>
          <div className={ `${styles.boardRow} ${rowHighlighted.row === 0 && styles.rowHighlighted } ${rowRef.current === 1 && styles.rowFinished }` }>
            <Letter wordleState={ wordleState } column={0} row={0} />
            <Letter wordleState={ wordleState } column={1} row={0} />
            <Letter wordleState={ wordleState } column={2} row={0} />
            <Letter wordleState={ wordleState } column={3} row={0} />
            <Letter wordleState={ wordleState } column={4} row={0} />
          </div>
          <div className={ `${styles.boardRow} ${rowHighlighted.row === 1 && styles.rowHighlighted } ${rowRef.current === 2 && styles.rowFinished }` }>
            <Letter wordleState={ wordleState } column={0} row={1} />
            <Letter wordleState={ wordleState } column={1} row={1} />
            <Letter wordleState={ wordleState } column={2} row={1} />
            <Letter wordleState={ wordleState } column={3} row={1} />
            <Letter wordleState={ wordleState } column={4} row={1} />
          </div>
          <div className={ `${styles.boardRow} ${rowHighlighted.row === 2 && styles.rowHighlighted } ${rowRef.current === 3 && styles.rowFinished }` }>
            <Letter wordleState={ wordleState } column={0} row={2} />
            <Letter wordleState={ wordleState } column={1} row={2} />
            <Letter wordleState={ wordleState } column={2} row={2} />
            <Letter wordleState={ wordleState } column={3} row={2} />
            <Letter wordleState={ wordleState } column={4} row={2} />
          </div>
          <div className={ `${styles.boardRow} ${rowHighlighted.row === 3 && styles.rowHighlighted } ${rowRef.current === 4 && styles.rowFinished }` }>
            <Letter wordleState={ wordleState } column={0} row={3} />
            <Letter wordleState={ wordleState } column={1} row={3} />
            <Letter wordleState={ wordleState } column={2} row={3} />
            <Letter wordleState={ wordleState } column={3} row={3} />
            <Letter wordleState={ wordleState } column={4} row={3} />
          </div>
          <div className={ `${styles.boardRow} ${rowHighlighted.row === 4 && styles.rowHighlighted } ${rowRef.current === 5 && styles.rowFinished }` }>
            <Letter wordleState={ wordleState } column={0} row={4} />
            <Letter wordleState={ wordleState } column={1} row={4} />
            <Letter wordleState={ wordleState } column={2} row={4} />
            <Letter wordleState={ wordleState } column={3} row={4} />
            <Letter wordleState={ wordleState } column={4} row={4} />
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

