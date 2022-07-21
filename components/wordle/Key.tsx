import React from 'react';
// css //
import styles from "../../styles/wordle/keyboard/Key.module.css";

interface IKeyProps {
  keyValue: string;
  actionKey?: boolean;
  selectLetter(e: React.MouseEvent<HTMLDivElement>): void;
}

export const Key: React.FunctionComponent<IKeyProps> = ({ keyValue, actionKey, selectLetter }): JSX.Element => {
  return (
    actionKey 
    ?
      <div className={ `${styles.key} ${styles.actionKey}` } onClick={ selectLetter }>{ keyValue }</div>
    :
      <div className={ `${styles.key} ${styles.regKey}` } onClick={ selectLetter} >{ keyValue }</div>
  );
};

