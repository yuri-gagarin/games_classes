import React, { useState } from 'react';
import { Segment } from "semantic-ui-react";
// additional components //
import { Letter } from './Letter';
// css
import styles from "../../styles/wordle/board/Board.module.css";

interface IBoardProps {
  generateBoard(columns: number, rows: number): string[][];
}

export const Board: React.FunctionComponent<IBoardProps> = ({ generateBoard }): JSX.Element => {
  const [ gameBoard, setGameBoard ] = useState<string[][]>(generateBoard(5, 5));

  // let's talk about how to make this more dynamic in class //
  return (
    <Segment style={{ border: "5px solid red"}}>
      <div className={ styles.boardRow }>
        <Letter position={0} attempt={0} />
        <Letter position={1} attempt={0} />
        <Letter position={2} attempt={0} />
        <Letter position={3} attempt={0} />
        <Letter position={4} attempt={0} />
      </div>
      <div className={ styles.boardRow }>
        <Letter position={0} attempt={0} />
        <Letter position={1} attempt={0} />
        <Letter position={2} attempt={0} />
        <Letter position={3} attempt={0} />
        <Letter position={4} attempt={0} />
      </div>
      <div className={ styles.boardRow }>
        <Letter position={0} attempt={0} />
        <Letter position={1} attempt={0} />
        <Letter position={2} attempt={0} />
        <Letter position={3} attempt={0} />
        <Letter position={4} attempt={0} />
      </div>
      <div className={ styles.boardRow }>
        <Letter position={0} attempt={0} />
        <Letter position={1} attempt={0} />
        <Letter position={2} attempt={0} />
        <Letter position={3} attempt={0} />
        <Letter position={4} attempt={0} />
      </div>
      <div className={ styles.boardRow }>
        <Letter position={0} attempt={0} />
        <Letter position={1} attempt={0} />
        <Letter position={2} attempt={0} />
        <Letter position={3} attempt={0} />
        <Letter position={4} attempt={0} />
      </div>
    </Segment>
  );
};

