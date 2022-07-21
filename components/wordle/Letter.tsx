import React from 'react';
//
import styles from "../../styles/wordle/letter/Letter.module.css";

interface ILetterProps {
  position: number;
  attempt: number;
}

export const Letter: React.FunctionComponent<ILetterProps> = ({ position, attempt }) => {
  return (
    <div className={ styles.letterMain }>
      X
    </div>
  );
};

