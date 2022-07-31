import React, { useEffect, useState } from 'react';
// css //
import styles from "../../styles/wordle/keyboard/Key.module.css";

interface IKeyProps {
  keyValue: string;
  actionKey?: boolean;
  selectLetter(e: React.MouseEvent<HTMLDivElement>): void;
  eliminatedKeys?: string[];
  currentTarget?: string;
}

export const Key: React.FunctionComponent<IKeyProps> = ({ keyValue, actionKey, selectLetter, eliminatedKeys, currentTarget }): JSX.Element => {
  const [ keyState, setKeyState ] = useState<{ eliminated: boolean; correct: boolean; }>({ eliminated: false, correct: false });

  useEffect(() => {
    if (eliminatedKeys && eliminatedKeys.length > 0) {
      for (const key of eliminatedKeys) {
        if (key === keyValue) {
          setKeyState({ eliminated: true, correct: false });
        }
      }
    } else {
      setKeyState({ eliminated: false, correct: false })
    }
  }, [ eliminatedKeys, currentTarget ]);

  return (
    actionKey 
    ?
      <div className={ `${styles.key} ${styles.actionKey}` } onClick={ selectLetter } >{ keyValue }</div>
    :
      keyState.eliminated
      ?
        <div className={ `${styles.key} ${styles.regKey} ${styles.eliminatedKey}` } onClick={ selectLetter}  >{ keyValue }</div>
      :
        keyState.correct 
        ?
        <div className={ `${styles.key} ${styles.regKey} ${styles.correctKey}` } onClick={ selectLetter}  >{ keyValue }</div>
        :
        <div className={ `${styles.key} ${styles.regKey}` } onClick={ selectLetter}  >{ keyValue }</div>

  );
};

