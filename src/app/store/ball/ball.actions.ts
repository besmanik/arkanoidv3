import { createAction, props } from '@ngrx/store';

export const setCoordinates = createAction(
  '[Ball] Set Coordinates',
  props<{ x: number; y: number }>()
);

export const changeDirection = createAction(
  '[Ball] Change Direction',
  props<{ dx: number; dy: number }>()
);

export const startGame = createAction('[Ball] Start Game');

export const endGame = createAction('[Ball] End Game');
