import { createAction, props } from '@ngrx/store';

export const setPaddleCoordinates = createAction(
  '[Paddle] Set Paddle Coordinates',
  props<{ x: number; y: number }>()
);
