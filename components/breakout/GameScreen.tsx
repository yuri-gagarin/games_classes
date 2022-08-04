import React, { KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import { Grid, Segment } from "semantic-ui-react";
// styles //
import styles from "../../styles/breakout/GameScreen.module.css";
import { GameBall, ballData } from './_helpers/gameBall';
import { Paddle, paddleData } from './_helpers/paddle';
import type { KeyMap } from './_helpers/paddle';
import { createBrickClasses, drawBricks } from './_helpers/gameBrick';

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
    //
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const paddle = new Paddle(paddleData.posX, paddleData.posY, 100, 15, ctx!);
    const gameBall = new GameBall(ballData.posX, ballData.posY, ballData.rad, ctx!);
    const { bricksList, bricksDataList } = createBrickClasses(15, ctx!);
    //
    const render = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks(bricksDataList, bricksList)
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

  useEffect(() => {
    if (canvasRef.current) {
      renderGame(canvasRef)
    }
  }, [ canvasRef.current ]);


  return (
    <Segment style={{ border: "5px solid red" }}>
      <canvas className={ styles.gameCanvas } width={500} height={300} ref={ canvasRef }>

      </canvas>
    </Segment>
  );
}
