import React, { useState } from 'react';
import { SnakeState } from '../../context/reducers/snakeReducer';
import styles from "../../styles/snake/SnakeBoard.module.css";


class LinkedListNode<T> {
  private value: T;
  private next: T| null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
};

class Cell  {
  private row: number;
  private column: number;
  private nextHeadVal: number;
  constructor(row: number, column: number, nextHeadVal: number) {
    this.row = row;
    this.column = column;
    this.nextHeadVal = nextHeadVal;
  }
};

class SingleLinkedList<T> {
  private _head: LinkedListNode<T>;
  private _next: LinkedListNode<T>;
  constructor(value: T) {
    const node: LinkedListNode<T> = new LinkedListNode<T>(value);
    this._head = node;
    this._next = node;
  }

  get head(): LinkedListNode<T> {
    return this._head;
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
};

interface ISnakeBoardProps {
  snakeState: SnakeState;
  dispatch: React.Dispatch<any>;
}

export const SnakeBoard: React.FunctionComponent<ISnakeBoardProps> = (props) => {
  const [ board, setBoard ] = useState<number[][]>(createBoard(BOARD_SIZE));
  const [ snakeCells, setSnakeCells ] = useState<Set<number>>(new Set([44]));
  const [ snake, setSnake ] = useState(new SingleLinkedList<Cell>(new Cell(5, 5, 44)));
  //
  const moveSnake = () => {
    const currentHeadCoord = { 
      row: snake.head
    }
  }
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

