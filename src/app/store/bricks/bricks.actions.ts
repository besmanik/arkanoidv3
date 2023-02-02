import { createAction, props } from '@ngrx/store';
import { IBrick } from 'src/app/types/bricks.interface';

export const destroyBrick = createAction(
  '[Bricks] Destroy Brick',
  props<{ id: number }>()
);

export const loadBricks = createAction('[Bricks] Load Bricks');

export const loadBricksSuccess = createAction(
  '[Bricks] Load Bricks Success',
  props<{ bricks: IBrick[] }>()
);

export const loadBricksFailure = createAction(
  '[Bricks] Load Bricks Failure',
  props<{ error: string }>()
);
