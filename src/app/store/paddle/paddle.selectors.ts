import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PaddleState } from './paddle.reducer';

export const selectP = (state: AppState) => state.paddle;

export const selectPaddle = createSelector(
  selectP,
  (state: PaddleState) => state.paddle
);
