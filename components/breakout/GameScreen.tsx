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
import { drawPlayerHUD, Player } from './_helpers/playerHud';

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

/*
type LocalState = {
  playing: boolean;
  ctx: CanvasRenderingContext2D;
  gameBall: GameBall; 
  paddle: Paddle; 
  bricks: Brick[];
};
*/

export interface IGameScreenProps {

};


export const GameScreen: React.FunctionComponent<IGameScreenProps> = (props: IGameScreenProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const paddleRef = useRef<Paddle | null>(null)
  const gameBallRef = useRef<GameBall | null>(null);
  const bricksRef = useRef<Brick[]>([]);
  const gameStop = useRef<boolean>(true);
  const playerRef = useRef<Player | null>(null);
  //const [ localState, setLocalState  ]= useState<LocalState>();


  const setUpGame = (canvas: HTMLCanvasElement): void => {
    //
    if (!gameStop.current) gameStop.current = true;
    console.log("ran setup");
    ctxRef.current = canvas.getContext("2d");
    paddleRef.current = new Paddle(paddleData.posX, paddleData.posY, paddleData.width, paddleData.height, ctxRef.current!);
    gameBallRef.current = new GameBall(ballData.posX, ballData.posY, ballData.rad, ctxRef.current!);
    const { bricksList } = createBrickClasses(15, ctxRef.current!);
    bricksRef.current = bricksList
    playerRef.current = new Player(5);
    ctxRef.current!.clearRect(0, 0, canvas!.width, canvas!.height);
    //
    drawPlayerHUD(ctxRef.current!, playerRef.current, gameData);
  };

  const startGame = () => {
    if (gameStop.current) {
      gameStop.current = false;
      renderGame();
    } else {
      return;
    }
  };
  const pauseGame = () => {
    gameStop.current = true;
  };
  const restartGame = () => {
    if (canvasRef.current) {
      setUpGame(canvasRef.current);
    }
  }

  const renderGame = () => {
    function render() {
      if (gameStop.current) return;
      const canvas = canvasRef.current;
      const ctx = ctxRef.current!;
      const gameBall = gameBallRef.current!;
      const paddle = paddleRef.current!;
      const bricks = bricksRef.current!;
      const player = playerRef.current!;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      // player hud //
      drawPlayerHUD(ctx, player, gameData);
      
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
        <canvas className={ styles.gameCanvas } width={500} height={350} ref={ canvasRef }>

        </canvas>
      </Segment>
      <Segment>
        <Button.Group>
          <Button content="Start" color="green" onClick={ startGame } />
          <Button content="Pause" color="orange" onClick={ pauseGame } />
          <Button content="Restart" color="red" onClick={ restartGame } />
        </Button.Group>
      </Segment>
    </Grid.Column>
  );
}
