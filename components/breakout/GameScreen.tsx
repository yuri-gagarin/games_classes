import React, { KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import { Grid, Segment } from "semantic-ui-react";
// styles //
import styles from "../../styles/breakout/GameScreen.module.css";
import { ballData, moveGameBall } from './_helpers/gameBall';
import { Paddle, paddleData } from './_helpers/paddle';
import type { KeyMap } from './_helpers/paddle';

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
    console.log(e.key)
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

  const drawBricks = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>): void => {

  };
  const renderGame = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>): void => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const paddle = new Paddle(paddleData.posX, paddleData.posY, 100, 15, ctx!);
    
    let x: number = 0;
    const render = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveGameBall(ctx, ballData);
        if ((ballData.y - ballData.rad) < 0 || (ballData.y + ballData.rad > canvas.height)) {
          ballData.dy *= -1;
        }
        if ((ballData.x - ballData.rad) < 0 || (ballData.x + ballData.rad > canvas.width)) {
          ballData.dx *= -1;
        }

        // paddle stuff
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

  })

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
