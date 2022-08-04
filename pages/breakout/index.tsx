import React from 'react';
import { Grid, Segment } from "semantic-ui-react";
// additional components //
import { GameScreen } from '../../components/breakout/GameScreen';
//

interface IBreakoutIndexProps {
}

const BreakoutIndex: React.FunctionComponent<IBreakoutIndexProps> = (props) => {
  return (
    <Grid.Row>
      <GameScreen />
    </Grid.Row>
  );
};

export default BreakoutIndex;
