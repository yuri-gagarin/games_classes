import React, { KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import { Grid, Segment } from "semantic-ui-react";
// styles //
import styles from "../../styles/breakout/GameScreen.module.css";
import { ballData, moveGameBall } from './_helpers/gameBall';
import { Paddle, paddleData } from './_helpers/paddle';

export interface IGameScreenProps {
}

export const GameScreen: React.FunctionComponent<IGameScreenProps> = (props: IGameScreenProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleKeyboardPress = useCallback((e: KeyboardEvent): void => {
    console.log(e.key)
    if (e.key === "ArrowRight") {
      paddleData.posX += paddleData.dx;
    } else if (e.key === "ArrowLeft") {
      paddleData.posX -= paddleData.dx;
    }
  }, [ paddleData ]);
  const drawBricks = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>): void => {

  };
  const renderBall = (canvasRef: React.MutableRefObject<HTMLCanvasElement | null>): void => {
    if (!canvasRef.current) return;
    let x: number = 0;
    const render = () => {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveGameBall(ctx, ballData);
        if ((ballData.y - ballData.rad) < 0 || (ballData.y + ballData.rad > canvas.height)) {
          ballData.dy *= -1;
        }
        if ((ballData.x - ballData.rad) < 0 || (ballData.x + ballData.rad > canvas.width)) {
          ballData.dx *= -1;
        }

        const paddle = new Paddle(paddleData.posX, paddleData.posY, 100, 15).draw(ctx);
        requestAnimationFrame(render);
      } 
    }
    render();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress);
    return () => window.removeEventListener("keydown", handleKeyboardPress);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      renderBall(canvasRef)
    }
  }, [ canvasRef.current ]);
  return (
    <Segment style={{ border: "5px solid red" }}>
      <canvas className={ styles.gameCanvas } width={500} height={300} ref={ canvasRef }>

      </canvas>
    </Segment>
  );
}
