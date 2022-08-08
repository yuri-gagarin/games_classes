import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Grid, Segment } from "semantic-ui-react";
// styles //
import styles from "../../styles/breakout/GameScreen.module.css";
//
import { ballData, GameBall } from './_helpers/gameBall';
import { paddleData, Paddle } from './_helpers/paddle';
import { createBrickClasses, drawBricks } from './_helpers/gameBrick';
//
import type { Brick } from "./_helpers/gameBrick";
import type { KeyMap } from "./_helpers/types";

const resetArrowKeys = (keyMap: KeyMap): void => {
  keyMap.up = false;
  keyMap.right = false;
  keyMap.down = false;
  keyMap.left = false;
}
const keyHeld: KeyMap = {
  left: false,
  right: false,
  up: false,
  down: false
}

export type GameData = {
  score: number;
  lives: number;
}
const gameData: GameData = {
  score: 0,
  lives: 5
};

type LocalState = {
  ctx: CanvasRenderingContext2D;
  gameBall: GameBall; 
  paddle: Paddle; 
  bricks: Brick[];
};

export interface IGameScreenProps {

};


export const GameScreen: React.FunctionComponent<IGameScreenProps> = (props: IGameScreenProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ localState, setLocalState  ]= useState<LocalState>();


  const setUpGame = (canvas: HTMLCanvasElement): void => {
    //
    console.log("ran setup");
    const ctx = canvas.getContext("2d");
    const paddle = new Paddle(paddleData.posX, paddleData.posY, paddleData.width, paddleData.height, ctx!);
    const gameBall = new GameBall(ballData.posX, ballData.posY, ballData.rad, ctx!);
    const { bricksList } = createBrickClasses(15, ctx!);
    //
    setLocalState({ ctx: ctx!, gameBall, paddle, bricks: bricksList });
  };
  const renderGame = () => {
    function render() {
      const { ctx, gameBall, paddle, bricks  } = localState as LocalState;
      const canvas = canvasRef.current;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      
      // ball stuff 
      gameBall.draw(ballData);
      gameBall.moveGameBall(ballData);
      gameBall.watchForWallCollision(ballData);
      gameBall.watchForPaddleCollision(ballData, paddleData, keyHeld);
      // 
      // paddle stuff //
      paddle.draw(paddleData);
      paddle.movePaddle(keyHeld, paddleData);
      //
      drawBricks(bricks);
      for (let i = 0; i < bricks.length; i++) {
        if (bricks[i]._visible) {
          bricks[i].setBallCollisionDectector(ballData, gameData);
        }
      }
      requestAnimationFrame(render);
    }
    render();
  }
  
  const handleKeyboardPress = useCallback((e: KeyboardEvent): void => {
    if (e.key === "ArrowRight") {
      keyHeld.right = true;
    } else if (e.key === "ArrowLeft") {
      keyHeld.left = true;
    } else {
      resetArrowKeys(keyHeld)
    }
  }, [ paddleData, keyHeld ]);

  const handleKeyUp = useCallback((): void => {
    return resetArrowKeys(keyHeld);
  }, [ keyHeld ]);


  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress);
    window.addEventListener("keyup", handleKeyUp);
    return () =>  {
      window.removeEventListener("keydown", handleKeyboardPress);
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) setUpGame(canvasRef.current)
  }, [ canvasRef.current ]);

  return (
    <Grid.Column width={16}>
      <Segment style={{ border: "5px solid red" }}>
        <div className={ styles.playerHUD }>
          <div className={ styles.playerHUDInner}>
            <span>Score: </span><span>{ gameData.score }</span>
          </div>
          <div className={ styles.playerHUDInner}>
            <span>Lives: </span><span>{ gameData.lives }</span>
          </div>
        </div>
        <canvas className={ styles.gameCanvas } width={500} height={300} ref={ canvasRef }>

        </canvas>
      </Segment>
      <Segment>
        <Button.Group>
          <Button content="Start" color="green" onClick={ renderGame } />
          <Button content="Pause" color="orange" />
        </Button.Group>
      </Segment>
    </Grid.Column>
  );
}
