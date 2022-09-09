import React, { useState } from 'react';
import { SnakeState } from '../../context/reducers/snakeReducer';
import styles from "../../styles/snake/SnakeBoard.module.css";


class LinkedListNode {
  private value: number;
  private next: number | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
};

class SingleLinkedList {
  private head: LinkedListNode;
  private next: LinkedListNode;
  constructor(value: number) {
    const node: LinkedListNode = new LinkedListNode(value);
    this.head = node;
    this.next = node;
  }
}



const BOARD_SIZE: number = 10;

const createBoard = (BOARD_SIZE: number): number[][] => {
  let cellVal = 1;
  const board: number[][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row: number[] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push(cellVal);
      cellVal++;
    }
    board.push(row);
  }
  return board;
}


const drawBoard = (boardSize: number): string[][] => {
  let counter: number = 1;
  return new Array(boardSize).fill(0).map((row) => {
    return new Array(boardSize).fill(0);
  })
}
interface ISnakeBoardProps {
  snakeState: SnakeState;
  dispatch: React.Dispatch<any>;
}

export const SnakeBoard: React.FunctionComponent<ISnakeBoardProps> = (props) => {
  const [ board, setBoard ] = useState<number[][]>(createBoard(BOARD_SIZE));
  const [ snakeCells, setSnakeCells ] = useState<Set<number>>(new Set([44]));
  const [ snake, setSnake ] = useState(new SingleLinkedList(44));
  return (
    <div className={ styles.snakeBoard }>
      {
        board.map((row, indexOfRow) => {
          return (
            <div key={"row" + "_" + indexOfRow} className={ styles.snakeBoardRow } >
              {
                row.map((cellVal, indexOfCell) => {
                  return (
                    <div key={ "cell" + "_" + indexOfCell } className={ `${styles.boardCell} ${snakeCells.has(cellVal) && styles.snakeCell}` }>
                      {cellVal}
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

