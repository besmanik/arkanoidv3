import { BallState } from './ball/ball.reducer';
import { BricksState } from './bricks/bricks.reducer';
import { PaddleState } from './paddle/paddle.reducer';

export interface AppState {
  bricks: BricksState;
  ball: BallState;
  paddle: PaddleState;
}
