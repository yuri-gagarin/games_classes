import React, { useEffect, useRef } from 'react';
import { Grid, Segment } from "semantic-ui-react";
// styles //
import styles from "../../styles/breakout/GameScreen.module.css";

export interface IGameScreenProps {
}

export const GameScreen: React.FunctionComponent<IGameScreenProps> = (props: IGameScreenProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(x, 50, 20, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke();
        x += 8;
        requestAnimationFrame(render);
      } 
    }
    render();
  }

  useEffect(() => {
    if (canvasRef.current) {
      renderBall(canvasRef)
    }
  }, [ canvasRef.current ]);
  return (
    <Segment style={{ border: "5px solid red" }}>
      <canvas className={ styles.gameCanvas } width={500} height={500} ref={ canvasRef }>

      </canvas>
    </Segment>
  );
}
