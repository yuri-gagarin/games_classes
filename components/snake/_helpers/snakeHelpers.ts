export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const checkOutOfBounds = (coordinates: { row: number; col: number }, board: number[][]): boolean => {
  const { row, col } = coordinates;
  if (row < 0 || col < 0) return true;
  if (row >= board.length || col >= board[0].length) return true;
  else return false;
}