import React from 'react';
// css //
import styles from "../../styles/wordle/keyboard/Key.module.css";

interface IKeyProps {
  keyValue: string;
  actionKey?: boolean;
}

export const Key: React.FunctionComponent<IKeyProps> = ({ keyValue, actionKey }): JSX.Element => {
  return (
    actionKey 
    ?
      <div className={ `${styles.key} ${styles.actionKey}` }>{ keyValue }</div>
    :
      <div className={ `${styles.key} ${styles.regKey}` }>{ keyValue }</div>
  );
};

