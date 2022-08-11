import type { GameData } from "../GameScreen";

export class Player {
  private _lives: number;
  constructor(lives: number) {
    this._lives = lives;
  }

  public get lives(): number {
    return this._lives;
  }
  public set lives(lives: number) {
    if (lives < 0 || lives > 5) {
      throw new Error("Invalid number for lives");
    }
    this._lives = lives;
  }
};

export const drawPlayerHUD = (canvasCtx: CanvasRenderingContext2D, player: Player, gameData: GameData) => {
  canvasCtx.beginPath();       
  canvasCtx.moveTo(0, 2.5);   
  canvasCtx.lineTo(500, 2.5);  
  canvasCtx.lineWidth = 5;
  canvasCtx.strokeStyle = "blue";
  canvasCtx.stroke();
  //
  canvasCtx.beginPath();
  canvasCtx.moveTo(500, 2.5);
  canvasCtx.lineTo(500, 35);
  canvasCtx.stroke();
  //
  canvasCtx.beginPath();
  canvasCtx.moveTo(500, 35);
  canvasCtx.lineTo(0, 35);
  canvasCtx.stroke();
  //
  canvasCtx.beginPath();
  canvasCtx.moveTo(0, 35);
  canvasCtx.lineTo(0, 0);
  canvasCtx.stroke();
  // first we draw a name //
  canvasCtx.lineWidth = 1;
  canvasCtx.strokeStyle = "white";
  canvasCtx.font = "20px serif";
  canvasCtx.strokeText(`L i v e s : ${player.lives}`, 25, 25);
  // 
  canvasCtx.font = "20px Arial";
  canvasCtx.strokeText(`S c o r e : ${gameData.score}`, canvasCtx.canvas.width - 125, 25)
}