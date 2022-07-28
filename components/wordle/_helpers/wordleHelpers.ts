export const generateBoard = (columns: number, rows: number,): string[][] => {
  const result: string[][] = []
  for (let i = 0; i < columns; i++) {
    result[i] = [];
    for (let j = 0; j < rows; j++) {
      // result[i].push(`r:${j}-c${i}`);
      result[i].push("0");
    }
  }
  return result;
}