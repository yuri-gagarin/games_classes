import React from 'react';
//
import styles from "../../styles/wordle/letter/Letter.module.css";

interface ILetterProps {
  column: number;
  row: number;
  board: string[][];
  
}

export const Letter: React.FunctionComponent<ILetterProps> = ({ column, row, board }) => {
  return (
    <div className={ styles.letterMain }>
      { board[column][row] }
    </div>
  );
};

