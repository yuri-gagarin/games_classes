import React, { useState } from 'react';
import styles from "../../styles/snake/SnakeBoard.module.css";


const boardSize: number = 10;

const drawBoard = (boardSize: number): string[][] => {
  return new Array(boardSize).fill(0).map((row) => {
    return new Array(boardSize).fill(0);
  })
}
interface ISnakeBoardProps {
}

export const SnakeBoard: React.FunctionComponent<ISnakeBoardProps> = (props) => {
  const [ board, setBoard ] = useState<string[][]>(drawBoard(10));
  return (
    <div className={ styles.board }>
      {
        board.map((row, i) => {
          return (
            <div key={i} className={ styles.boardRow } >
              {
                row.map((col, j) => {
                  return (
                    <div key={ j } className={ styles.boardColumn }>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }

    </div>
  );
};

