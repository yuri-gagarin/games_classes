import React, { useEffect } from 'react';
import { Grid } from "semantic-ui-react";
import { Board } from '../../components/wordle/Board';

interface IWordleIndexProps {
}

const generateBoard = (columns: number, rows: number,): string[][] => {
  const result: string[][] = []
  for (let i = 0; i < columns; i++) {
    result[i] = [];
    for (let j = 0; j < rows; j++) {
      result[i].push("");
    }
  }
  console.log(result)
  return result;
}

export const WordleIndex: React.FunctionComponent<IWordleIndexProps> = (props): JSX.Element => {

  useEffect(() => {
    generateBoard(5, 5);
  }, []);

  return (
    <Grid.Row>
      <Grid.Column>
        <Board 
          generateBoard={ generateBoard }
        />
      </Grid.Column>
    </Grid.Row>
  )
  ;
};

export default WordleIndex;
