import { BallState } from './ball/ball.reducer';
import { BricksState } from './bricks/bricks.reducer';

export interface AppState {
  bricks: BricksState;
  ball: BallState;
}
