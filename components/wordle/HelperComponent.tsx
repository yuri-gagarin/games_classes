import React from 'react';
// styles //
import styles from "../../styles/wordle/additional/HelperComponent.module.css";

interface IMakeAGuessProps {
  helperError: { message: string } | null;
  message: string | null;
}

export const HelperComponent: React.FunctionComponent<IMakeAGuessProps> = ({ helperError, message }): JSX.Element => {
  return (
    helperError 
    ? 
      <div className={ styles.helperComponentWrapper } >
        <div className={ styles.innerError }>{helperError.message }</div>
      </div>
    :
    <div className={ styles.helperComponentWrapper } >
      <div className={ styles.inner }>{ message ? message : "Game Active" }</div>
    </div>
  );
};

