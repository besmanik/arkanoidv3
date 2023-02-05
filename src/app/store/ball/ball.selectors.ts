import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { BallState } from './ball.reducer';

export const selectB = (state: AppState) => state.ball;

export const selectBall = createSelector(
  selectB,
  (state: BallState) => state.ball
);
