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
  const [ letterState, setLetterState ] = useState<{ correct: boolean; correctIdx: boolean; eliminated: boolean; }>({ correct: false, correctIdx: false, eliminated: false });
  useEffect(() => {
    if (wordleState.pastGuesses.length > 0 && wordleState.pastGuesses.length >= row) {
      if (wordleState.targetWord.indexOf(wordleState.board[column][row]) > -1) {
         if (wordleState.targetWord[column] === wordleState.board[column][row]) {
          setLetterState({ correct: false, correctIdx: true, eliminated: false })
         } else {
          setLetterState({ correct: true, correctIdx: false, eliminated: false });
         }
      } else {
        setLetterState({ correct: false, correctIdx: false, eliminated: true });
      }
    }
  }, [ wordleState.pastGuesses, wordleState.targetWord, wordleState.board ]);
  if (letterState.correct) {
    return (
      <div className={ `${styles.letter} ${styles.letterCorrect}` }>
        { wordleState.board[column][row] }
      </div>
    );
  } else if (letterState.correctIdx) {
    return (
      <div className={ `${styles.letter} ${styles.letterCorrectIdx}` }>
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

