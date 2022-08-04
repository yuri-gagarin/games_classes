import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Grid, Segment } from "semantic-ui-react";
// styles //
import styles from "../../styles/breakout/GameScreen.module.css";
//
import { ballData, GameBall } from './_helpers/gameBall';
import { paddleData, Paddle } from './_helpers/paddle';
import { createBrickClasses, drawBricks } from './_helpers/gameBrick';
//
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

export interface IGameScreenProps {
}

export const GameScreen: React.FunctionComponent<IGameScreenProps> = (props: IGameScreenProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<boolean>(false);

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

  
  const renderGame = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>): void => {
    if (!canvasRef.current) return;
    if (gameRef.current === true) return;
    //
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const paddle = new Paddle(paddleData.posX, paddleData.posY, 100, 200, ctx!);
    const gameBall = new GameBall(ballData.posX, ballData.posY, ballData.rad, ctx!);
    const { bricksList, bricksDataList } = createBrickClasses(15, ctx!);
    //
    const render = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
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
        for (let i = 0; i < bricksDataList.length; i++) {
          if (bricksDataList[i].shownOnScreen) {
            bricksList[i].setBallCollisionDectector(ballData, bricksDataList[i]);
          }
        }
        drawBricks(bricksDataList, bricksList)
        
        //
        requestAnimationFrame(render);
      } 
    }
    render();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress);
    window.addEventListener("keyup", handleKeyUp);
    return () =>  {
      window.removeEventListener("keydown", handleKeyboardPress);
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, []);

  return (
    <Grid.Column width={16}>
      <Segment style={{ border: "5px solid red" }}>
        <canvas className={ styles.gameCanvas } width={500} height={300} ref={ canvasRef }>

        </canvas>
      </Segment>
      <Segment>
        <Button.Group>
          <Button content="Start" color="green" onClick={ () => renderGame(canvasRef) } />
          <Button content="Pause" color="orange" />
        </Button.Group>
      </Segment>
    </Grid.Column>
  );
}
