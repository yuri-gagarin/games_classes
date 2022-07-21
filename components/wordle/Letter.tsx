import React from 'react';
//
import styles from "../../styles/wordle/letter/Letter.module.css";

interface ILetterProps {
  position: number;
  attempt: number;
  board: string[][];
}

export const Letter: React.FunctionComponent<ILetterProps> = ({ position, attempt, board }) => {
  return (
    <div className={ styles.letterMain }>
      { board[position][attempt] }
    </div>
  );
};

