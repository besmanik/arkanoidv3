import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { BricksState } from './bricks.reducer';

export const selectBricks = (state: AppState) => state.bricks;

export const selectAllBricks = createSelector(
  selectBricks,
  (state: BricksState) => state.bricks
);
