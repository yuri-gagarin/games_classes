import type { CharMap } from "../../../context/reducers/wordleReducer";

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
};


export type WordValidationRes = {
  valid: boolean;
  word: string;
};
export const validateGuessedWord = (board: string[][], rowToCheck: number): WordValidationRes => {
  const word: string[] = [];
  const response: WordValidationRes = { valid: false, word: "" };
  for (let col = 0; col < board.length; col++) {
    for (let row = 0; row < board[col].length; row++) {
      if (row === rowToCheck) {
        // we need to check if value is present //
        if ((/[a-zA-Z]/).test(board[col][row])) {
          word.push(board[col][row]);
          break;
        } else {
          return { valid: false, word: word.join("") }
        }
      } else {
        continue;
      }
    }
  }
  return { valid: true, word: word.join("") };
};

// guessed === ANGER   target = AMONG 
export const mapGuessedWord = (guessedWord: string, targetWord: string) => {
  const correctLettersMap: CharMap = {};
  const eliminatedLetters: string[] = [];

  if (guessedWord === targetWord) {
  // yay... //
  } else {
    for (let i = 0; i <guessedWord.length; i++) {
      for (let j = 0; j < targetWord.length; j++) {
        if (guessedWord[i] === targetWord[j]) {
          if (correctLettersMap[guessedWord[i]]) {
            correctLettersMap[guessedWord[i]].push(j);
          } else {
            correctLettersMap[guessedWord[i]] = [j]         
          }
          continue;
        }
        if (j === targetWord.length - 1) {
          eliminatedLetters.push(guessedWord[i]);
        }
      }
    }
  }
}