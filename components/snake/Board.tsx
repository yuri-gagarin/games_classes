import React, { useState } from 'react';
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


const drawBoard = (boardSize: number): string[][] => {
  let counter: number = 1;
  return new Array(boardSize).fill(0).map((row) => {
    return new Array(boardSize).fill(0);
  })
}
interface ISnakeBoardProps {
}

export const SnakeBoard: React.FunctionComponent<ISnakeBoardProps> = (props) => {
  const [ board, setBoard ] = useState<string[][]>(drawBoard(10));
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
                    <div key={ "cell" + "_" + indexOfCell } className={ `${styles.snakeBoardCell} ${snakeCells.has(parseInt(cellVal)) && styles.snakeCell}` }>
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

