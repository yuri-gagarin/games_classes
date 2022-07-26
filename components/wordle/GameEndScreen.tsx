import React, { useEffect } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
// css //
import styles from "../../styles/wordle/additional/GameEndScreen.module.css";
// types //
import type { ButtonProps } from "semantic-ui-react";
import type { WordleState } from '../../context/reducers/wordleReducer';

interface IGameEndScreenProps {
  wordleState: WordleState;
  startNewGame(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: ButtonProps): void;
}

const GameEndScreen: React.FunctionComponent<IGameEndScreenProps> = ({ wordleState, startNewGame }): JSX.Element => {
  const { gameState, targetWord, pastGuesses } = wordleState;

  return (
    <Segment inverted color="grey" className={ styles.mainSegment }>
      <Header textAlign='center'>Wordle!</Header>
      {
        gameState == "GameOver" &&
        <Segment inverted color="red">
          <div className={ styles.innerText }>You Lost</div>
          <div className={ styles.innerText }>The word was: <span>{targetWord}</span></div>
        </Segment>
      }
      {
        gameState === "New" &&
        <Segment inverted color="grey">
          <div className={ styles.innerText }>Welcome:</div>
          <div className={ styles.innerText }>Select difficulty below and begin!</div>
        </Segment>
      }
      {
        gameState === "Won" &&
        <Segment inverted color="blue">
          <div className={ styles.innerText }>Cogratulations! You Won!</div>
          <div className={ styles.innerText }>{`You guessed correctly in ${pastGuesses.length} turns!`}</div>
        </Segment>
      }
     
      <Button.Group>
        <Button color="blue" content="New Game"  onClick={ startNewGame }/>
        <Button.Or />
        <Button color='green' icon="arrow left" content="Back to Main" />
      </Button.Group>
    </Segment>
  );
};

export default GameEndScreen;
