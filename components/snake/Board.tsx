import React, { useState } from 'react';
import styles from "../../styles/snake/SnakeBoard.module.css";


class LinkedListNode {
  private value: any;
  private next: any;
  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
};

class SingleLinkedList {
  private head: any;
  private next: any;
  constructor(value: any) {
    const node: LinkedListNode = new LinkedListNode(value);
    this.head = node;
    this.next = node;
  }
}



const BOARD_SIZE: number = 10;


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
    <div className={ styles.snakeBoard }>
      {
        board.map((row, i) => {
          return (
            <div key={i} className={ styles.snakeBoardRow } >
              {
                row.map((col, j) => {
                  return (
                    <div key={ j } className={ styles.snakeBoardCell }>
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

