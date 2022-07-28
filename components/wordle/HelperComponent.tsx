import React from 'react';
// styles //
import styles from "../../styles/wordle/additional/HelperComponent.module.css";

interface IMakeAGuessProps {
  visible: boolean;
  message: string;
}

export const HelperComponent: React.FunctionComponent<IMakeAGuessProps> = ({ visible, message }): JSX.Element => {
  return (
    <div className={ styles.helperComponentWrapper } >
      <div>{ message }</div>
    </div>
  );
};

