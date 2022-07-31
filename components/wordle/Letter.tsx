import React, { useEffect, useState } from 'react';
//
import styles from "../../styles/wordle/letter/Letter.module.css";
import type { WordleState } from '../../context/reducers/wordleReducer';

interface ILetterProps {
  column: number;
  row: number;
  wordleState: WordleState;
  
}

export const Letter: React.FunctionComponent<ILetterProps> = ({ column, row, wordleState }) => {
  const [ letterState, setLetterState ] = useState<{ exists: boolean; correctIdx: boolean; eliminated: boolean; }>({exists: false, correctIdx: false, eliminated: false });


  useEffect(() => {
    const { eliminatedLetters, eliminatedRows, board, targetWord } = wordleState;
    if (eliminatedRows.includes(row)) {
      // lets set the correct/correctIdx/eliminated //
      if (eliminatedLetters.includes(board[column][row])) {
        setLetterState({ exists: false, correctIdx: false, eliminated: true })
      } else if (targetWord[column] === board[column][row]) {
        // correct idx //
        setLetterState({ exists: true, correctIdx: true, eliminated: false });
      } else {
        setLetterState({ exists: true, correctIdx: false, eliminated: false });
      }
    }
  }, [ wordleState, row ]);

  
  if (letterState.exists && letterState.correctIdx) {
    return (
      <div className={ `${styles.letter} ${styles.letterCorrectIdx}` }>
        { wordleState.board[column][row] }
      </div>
    );
  } else if (letterState.exists) {
    return (
      <div className={ `${styles.letter} ${styles.letterCorrect}` }>
        { wordleState.board[column][row] }
      </div>
    );
  } else if (letterState.eliminated) {
    return (
      <div className={ `${styles.letter} ${styles.letterEliminated}` }>
        { wordleState.board[column][row] }
      </div>
    );
  } else {
    return (
      <div className={ `${styles.letter} ${styles.letterMain}` }>
        { wordleState.board[column][row] }
      </div>
    );
  }
};

