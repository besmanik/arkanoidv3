import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { BallState } from './ball.reducer';

export const select = (state: AppState) => state.ball;

export const selectBall = createSelector(
  select,
  (state: BallState) => state.ball
);
