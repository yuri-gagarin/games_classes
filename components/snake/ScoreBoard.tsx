import React from 'react';
import { Segment } from "semantic-ui-react";

interface IScoreBoardProps {
  score: number;
  lives: number;
};


export const ScoreBoard: React.FunctionComponent<IScoreBoardProps> = ({ score, lives }) => {
  return (
    <Segment>
      <div><span>Score:</span>{ score }</div>
      <div><span>Lives:</span>{ lives }</div>
    </Segment>
  );
};

export default ScoreBoard;
