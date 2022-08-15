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

const drawHeart = (fromx: number, fromy: number, lw: number, hlen: number, ctx: CanvasRenderingContext2D) => {

  var x = fromx;
  var y = fromy;
  var width = lw ;
  var height = hlen;

  ctx.save();
  ctx.beginPath();
  var topCurveHeight = height * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  // top left curve
  ctx.bezierCurveTo(
    x, y, 
    x - width / 2, y, 
    x - width / 2, y + topCurveHeight
  );

  // bottom left curve
  ctx.bezierCurveTo(
    x - width / 2, y + (height + topCurveHeight) / 2, 
    x, y + (height + topCurveHeight) / 2, 
    x, y + height
  );

  // bottom right curve
  ctx.bezierCurveTo(
    x, y + (height + topCurveHeight) / 2, 
    x + width / 2, y + (height + topCurveHeight) / 2, 
    x + width / 2, y + topCurveHeight
  );

  // top right curve
  ctx.bezierCurveTo(
    x + width / 2, y, 
    x, y, 
    x, y + topCurveHeight
  );

  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.restore();
};

export const drawLives = (lives: number, ctx: CanvasRenderingContext2D) => {
  let x = 120; let y = 10;
  for (let i = 0; i < lives; i++) {
    drawHeart(x, y, 17, 15, ctx);
    x+= 25;
  }
}

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
  canvasCtx.strokeText(`L i v e s : `, 25, 25);
  // 
  canvasCtx.font = "20px Arial";
  canvasCtx.strokeText(`S c o r e : ${gameData.score}`, canvasCtx.canvas.width - 125, 25)

  drawLives(gameData.lives, canvasCtx);
}