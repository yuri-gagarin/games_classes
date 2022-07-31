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

/*
// guessed === ANGER   target = AMONG 
export const mapGuessedWord = (guessedWord: string, targetWord: string, currentCharMap: CharMap, currentEliminated: string[]) => {
  const correctLettersMap: CharMap = { ...currentCharMap }
  const eliminatedLetters: string[] = [ ...currentEliminated ];

  if (guessedWord === targetWord) {
    // yay... //
  } else {
    for (let i = 0; i < guessedWord.length; i++) {
      if (targetWord.indexOf(guessedWord[i]) > -1) {
        for (let j = 0; j < targetWord.length; j++) {
          if (guessedWord[i] === targetWord[j]) {
            if (correctLettersMap[guessedWord[i]] && !correctLettersMap[guessedWord[i]].includes(j)) {
              correctLettersMap[guessedWord[i]].push(j);
            } else {
              correctLettersMap[guessedWord[i]] = [j]
            }
          }
        }
      } else {
        eliminatedLetters.push(guessedWord[i])
      }
    }
  }
  return { correctLettersMap, eliminatedLetters };
}
*/
export const returnEliminatedLetters = (guessedWord: string, targetWord: string, currentEliminatedLetters: string[]): string[] => {
  const updatedEliminatedLetters: string[] = [ ...currentEliminatedLetters ];
  for (const char of guessedWord) {
    if (targetWord.indexOf(char) === -1) {
      // we need to eliminated the letter but first ..//
      // console.log(char);
      if (!updatedEliminatedLetters.includes(char)) {
        updatedEliminatedLetters.push(char);
      }
    }
  }
  return  updatedEliminatedLetters;
}