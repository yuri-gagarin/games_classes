import React, { useEffect, useState } from 'react';
import { SnakeState } from '../../context/reducers/snakeReducer';
import styles from "../../styles/snake/SnakeBoard.module.css";
import { checkOutOfBounds, randomIntFromInterval } from './_helpers/snakeHelpers';


class LinkedListNode<T> {
  private _value: T;
  private _next: T | null;
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
  private _value: number;

  constructor(row: number, column: number, value: number) {
    this._row = row;
    this._column = column;
    this._value = value;
  }

  set row(row: number){
    this._row = row;
  }
  set col(col: number) {
    this._column = col;
  }
  get row(): number {
    return this._row;
  }
  get col(): number {
    return this._column;
  }
  get value(): number {
    return this._value;
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
  private _tail: LinkedListNode<T>;
  constructor(value: T) {
    const node: LinkedListNode<T> = new LinkedListNode<T>(value);
    this._head = node;
    this._tail = node;
  }

  set head(head: LinkedListNode<T>) {
    this._head = head;
  }
  set tail(tail: LinkedListNode<T>) {
    this._tail = tail;
  }
  get head(): LinkedListNode<T> {
    return this._head;
  }
  get tail(): LinkedListNode<T>{
    return this._tail;
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
  const [ snake, setSnake ] = useState(new SingleLinkedList<Cell>(new Cell(4, 3, 44)));
  const [ snakeCells, setSnakeCells ] = useState<Set<number>>(new Set([44]));
  const [ pointCell, setPointCell ] = useState<number>(snake.head.value.value + 5)
  const [ direction, setDireaction ] = useState<Direction>(Direction.RIGHT);
  const [ gameState, setGameState  ] = useState<"Playing" | "Won" | "GameOver" | "Paused">("Paused");
  //

  const handlePoint = (BOARD_SIZE: number) => {
    const maxPossValue: number = Math.pow(BOARD_SIZE, 2);
    let nextPointCell: number;
    while(true) {
      nextPointCell = randomIntFromInterval(1, maxPossValue);
      if (snakeCells.has(nextPointCell) || pointCell === nextPointCell) {
        continue;
      } else {
        break;
      }
    }
    setPointCell(nextPointCell);
  } 

  const handleGameOver = () => {
    console.log("handlegameover")
    setSnake(new SingleLinkedList<Cell>(new Cell(4, 3, 44)));
    setSnakeCells(new Set([44]));
  };

  const getNextHeadCoords = (currentHeadCoords: Cell, direction: Direction): { row: number; col: number; } => {

    if (direction === Direction.UP) {
      return {
        row: currentHeadCoords.row - 1,
        col: currentHeadCoords.col 
      };
    } else if (direction === Direction.RIGHT) {
      return {
        row: currentHeadCoords.row,
        col: currentHeadCoords.col + 1
      };
    } else if (direction === Direction.DOWN) {
      return {
        row: currentHeadCoords.row + 1,
        col: currentHeadCoords.col
      };
    } else if (direction === Direction.LEFT) {
      return {
        row: currentHeadCoords.row,
        col: currentHeadCoords.col - 1
      }
    } else {
      return { row: currentHeadCoords.row, col: currentHeadCoords.col };
    }
  }
  const moveSnake = () => {
    const nextHeadCoords = getNextHeadCoords(snake.head.value, direction);
    // ok first check out of bounds 

    const nextHeadVal = board[nextHeadCoords.row][nextHeadCoords.col];
    if (checkOutOfBounds(nextHeadCoords, board)) {
      handleGameOver();
    }
    /// handle a food cell?

    const newHead = new LinkedListNode<Cell>(new Cell(nextHeadCoords.row, nextHeadCoords.col, nextHeadVal)); // are we making it too weird? //
    //
    const updatedSnakeCells = new Set(snakeCells);
    updatedSnakeCells.delete(snake.tail.value.value); // confusing //
    updatedSnakeCells.add(nextHeadVal);

    if (newHead.value.value === pointCell) {
      handlePoint(BOARD_SIZE);
    };

    snake.head = newHead;
    snake.tail = newHead;
    setSnakeCells(updatedSnakeCells);
  }

  const listenToKeyPress = (e: KeyboardEvent) => {
    if (getDirectionFromKey(e.key) === Direction.NONE) return;
    setDireaction(getDirectionFromKey(e.key));
  }

  useEffect(() => {
    window.addEventListener("keydown", listenToKeyPress);
    return () => {
      window.removeEventListener("keydown", listenToKeyPress);
    }
  }, []);

  useEffect(() => {
    console.log(direction);
    const moveSnake = () => {
      const nextHeadCoords = getNextHeadCoords(snake.head.value, direction);
      // ok first check out of bounds 
  
      const nextHeadVal = board[nextHeadCoords.row][nextHeadCoords.col];
      if (checkOutOfBounds(nextHeadCoords, board)) {
        handleGameOver();
      }
      /// handle a food cell?
  
      const newHead = new LinkedListNode<Cell>(new Cell(nextHeadCoords.row, nextHeadCoords.col, nextHeadVal)); // are we making it too weird? //
      //
      const updatedSnakeCells = new Set(snakeCells);
      updatedSnakeCells.delete(snake.tail.value.value); // confusing //
      updatedSnakeCells.add(nextHeadVal);
  
      if (newHead.value.value === pointCell) {
        handlePoint(BOARD_SIZE);
      };
  
      snake.head = newHead;
      snake.tail = newHead;
      setSnakeCells(updatedSnakeCells);
    }
  
  }, [direction])

  return (
    <div className={ styles.snakeBoard }>
      <button onClick={moveSnake}>Manual</button>
      {
        board.map((row, indexOfRow) => {
          return (
            <div key={"row" + "_" + indexOfRow} className={ styles.snakeBoardRow } >
              {
                row.map((cellVal, indexOfCell) => {
                  return (
                    <div key={ "cell" + "_" + indexOfCell } className={ `${styles.boardCell} ${snakeCells.has(cellVal)  && styles.snakeCell} ${cellVal === pointCell && !snakeCells.has(cellVal) && styles.pointCell}` }>
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

