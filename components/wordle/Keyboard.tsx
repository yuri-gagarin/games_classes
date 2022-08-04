import React, { useCallback, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
// additional components //
import { Key } from "../../components/wordle/Key";
// context //
// css // 
import styles from "../../styles/wordle/keyboard/Keyboard.module.css";
import { enterLetter, deleteKeyPress, guessWord, ensureDeleteIsAllowed } from "../../context/actions/wordle/wordleActions";
// types //
import type { Dispatch } from "react";
import type { WordleState } from '../../context/reducers/wordleReducer';
import type { WordleAction } from "../../context/actions/wordle/wordleActions";


interface IKeyboardProps {
  wordleState: WordleState;
  dispatch: Dispatch<WordleAction>;
}

export const Keyboard: React.FunctionComponent<IKeyboardProps> = ({ dispatch, wordleState }): JSX.Element => {
  //
  const KeyRow1: string[] = [ "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P" ];
  const KeyRow2: string[] = [ "A", "S", "D", "F", "G", "H", "J", "K", "L" ];
  const KeyRow3: string[] = [ "Z", "X", "C", "V", "B", "N", "M"];                 // leave a challenge for class - can we generate these using afunction? //

  const selectLetter = (e: React.MouseEvent<HTMLDivElement>): void => {
    const value: string = e.currentTarget.innerHTML;
    enterLetter(dispatch, value, wordleState);
  };

  const handleKeyboardPress = useCallback((e: KeyboardEvent): void => {
    const allowedKeys = [ ...KeyRow1, ...KeyRow2, ...KeyRow3 ];

    if (e.code === "Backspace") {
      if (ensureDeleteIsAllowed(wordleState)) {
        return deleteKeyPress(dispatch, wordleState);
      } else {
        const { cursor, pastGuesses } = wordleState;
        if (cursor.posX === 0 && cursor.posY === 0) {
          dispatch({ type: "SetIncorrectInput", payload: { message: "You have not even entered a letter yet!" } });
        } else if (cursor.posX === 0 && cursor.posY > 0 && cursor.row ===  pastGuesses.length) {
          dispatch({ type: "SetIncorrectInput", payload: { message: "Woa Woa! No backsies!" } });
        } else {
          dispatch({ type: "SetIncorrectInput", payload: { message: "Don't know. Maybe gremlins..." } });
        }
      }
    } else if (e.code === "Enter") {
      guessWord(dispatch, wordleState);
    } else {
      const { eliminatedLetters } = wordleState;
      if (allowedKeys.includes(e.key.toUpperCase())) {
        if (!eliminatedLetters.includes(e.key.toUpperCase())) {
          return enterLetter(dispatch, e.key.toUpperCase(), wordleState);
        } else {
          dispatch({ type: "SetIncorrectInput", payload: { message: "Key is eliminated" } });
        }
      }
    }
  }, [ wordleState ]);

  const selectDeleteKey = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget.innerHTML === "DELETE") {
      deleteKeyPress(dispatch, wordleState);
    }
  };

  useEffect(() => {
    //console.log(wordleState.cursor)
    window.addEventListener("keyup", handleKeyboardPress);
    return () => window.removeEventListener("keyup", handleKeyboardPress);
  }, [ handleKeyboardPress ]);

  return (
    <Segment>
      <div className={ styles.keyRowOuter }>
        <div className={ `${styles.keyRowInner} ${styles.keyRowInner1}` }>
        {
          KeyRow1.map((key) => {
            return (
              <Key key={key} keyValue={key} selectLetter={ selectLetter } eliminatedKeys={wordleState.eliminatedLetters} currentTarget={ wordleState.targetWord } />
            )
          })
        }
        </div>
      </div>
      <div className={ styles.keyRowOuter }>
        <div className={ `${styles.keyRowInner} ${styles.keyRowInner2}` }>
        {
          KeyRow2.map((key) => {
            return (
              <Key key={key} keyValue={key} selectLetter={ selectLetter } eliminatedKeys={wordleState.eliminatedLetters} currentTarget={ wordleState.targetWord }  />
            )
          })
        }
        </div>
      </div>
      <div className={ styles.keyRowOuter }>
        <div className={ `${styles.keyRowInner} ${styles.keyRowInner3}` }>
        {
          KeyRow3.map((key) => {
            return (
              <Key key={key} keyValue={key} selectLetter={ selectLetter } eliminatedKeys={wordleState.eliminatedLetters} currentTarget={ wordleState.targetWord } />
            )
          })
        }
        </div>
      </div>
      <div className={ styles.keyRowOuter }>
        <div className={ `${styles.keyRowInner} ${styles.keyRowInner4}` }>
          <Key keyValue='ENTER' selectLetter={ selectLetter } eliminatedKeys={wordleState.eliminatedLetters}  actionKey />
          <Key keyValue='DELETE' selectLetter={ selectDeleteKey } eliminatedKeys={wordleState.eliminatedLetters}  actionKey />
        </div>
      </div>
      
    </Segment>
  );
};

