import React, { useEffect, useState } from 'react';
import { SnakeState } from '../../context/reducers/snakeReducer';
import styles from "../../styles/snake/SnakeBoard.module.css";


class LinkedListNode<T> {
  private _value: T;
  private _next: T| null;
  constructor(value: T) {
    this._value = value;
    this._next = null;
  }
  get value(): T {
    return this._value;
  }
  get next(): T | null {
    return this._next;
  }
};


class Cell  {
  private _row: number;
  private _column: number;
  private _nextHeadVal: number;

  constructor(row: number, column: number, nextHeadVal: number) {
    this._row = row;
    this._column = column;
    this._nextHeadVal = nextHeadVal;
  }

  get row(): number {
    return this._row;
  }
  get column(): number {
    return this._column;
  }
  get nextHeadVal(): number {
    return this._nextHeadVal;
  }
};

enum Direction {
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  LEFT = "LEFT",
  NONE = "NONE"
};
const getDirectionFromKey = (key: string): Direction => {
  if (key === "ArrowUp") return Direction.UP;
  if (key === "ArrowRight") return Direction.RIGHT;
  if (key === "ArrowDown") return Direction.DOWN;
  if (key === "ArrowLeft") return Direction.LEFT;
  return Direction.NONE;
}

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
  get next(): LinkedListNode<T> {
    return this._next;
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
  const [ snake, setSnake ] = useState(new SingleLinkedList<Cell>(new Cell(6, 5, 45)));
  const [ snakeCells, setSnakeCells ] = useState<Set<number>>(new Set([44]));
  //

  const getHextHeadCoords = (currentHeadCoords: Cell, direction: Direction) => {
    if (direction === Direction.UP) {

    } else if (direction === Direction.RIGHT) {

    } else if (direction === Direction.DOWN) {

    } else if (direction === Direction.LEFT) {

    } else {
      return;
    }
  }
  const moveSnake = () => {
    const currentHeadCoord = { 
      row: snake.head.value.row,
      column: snake.head.value.column
    };
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (getDirectionFromKey(e.key) === Direction.NONE) return;
      console.log(getDirectionFromKey(e.key));
    })
  }, []);

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

