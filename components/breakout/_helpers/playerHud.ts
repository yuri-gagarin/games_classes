export class Player {
  private canvasCtx: CanvasRenderingContext2D;
  constructor(canvasCtx: CanvasRenderingContext2D) {
    this.canvasCtx = canvasCtx;
  }
};

export const drawPlayerHUD = (canvasCtx: CanvasRenderingContext2D, player: Player) => {
  // first we draw a name //
  canvasCtx.font = "15px Timens "
}