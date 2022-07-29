import React from 'react';
//
import styles from "../../styles/wordle/letter/Letter.module.css";

interface ILetterProps {
  column: number;
  row: number;
  board: string[][];
  
}

export const Letter: React.FunctionComponent<ILetterProps> = ({ column, row, board }) => {
  console.log(column)
  return (
    <div className={ styles.letterMain }>
      { board[row][column] }
    </div>
  );
};

