import React, { useEffect, useState } from 'react';
// css //
import styles from "../../styles/wordle/keyboard/Key.module.css";

interface IKeyProps {
  keyValue: string;
  actionKey?: boolean;
  selectLetter(e: React.MouseEvent<HTMLDivElement>): void;
  eliminatedKeys: string[];
}

export const Key: React.FunctionComponent<IKeyProps> = ({ keyValue, actionKey, selectLetter, eliminatedKeys }): JSX.Element => {
  const [ eliminated, setEliminated ] = useState<boolean>(false);

  useEffect(() => {
    if (eliminatedKeys.length > 0) {
      for (const key of eliminatedKeys) {
        if (key === keyValue) {
          setEliminated(true);
        }
      }
    }
  }, [ eliminatedKeys ])
  return (
    actionKey 
    ?
      <div className={ `${styles.key} ${styles.actionKey}` } onClick={ selectLetter } >{ keyValue }</div>
    :
      eliminated 
      ?
        <div className={ `${styles.key} ${styles.regKey} ${styles.eliminatedKey}` } onClick={ selectLetter}  >{ keyValue }</div>
      :
        <div className={ `${styles.key} ${styles.regKey}` } onClick={ selectLetter}  >{ keyValue }</div>

  );
};

