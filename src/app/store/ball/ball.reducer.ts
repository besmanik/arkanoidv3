import { createReducer, on } from '@ngrx/store';
import { IBall } from 'src/app/types/ball.interface';
import { changeDirection, setCoordinates } from './ball.actions';

export interface BallState {
  ball: IBall;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: BallState = {
  ball: { x: 0, y: 0, dx: 1, dy: -1, isMoving: false },
  error: '',
  status: 'pending',
};

export const ballReducer = createReducer(
  initialState,
  on(setCoordinates, (state, { x, y }) => {
    return { ...state, ball: { ...state.ball, x, y, isMoving: true } };
  }),
  on(changeDirection, (state, { dx, dy }) => {
    return { ...state, ball: { ...state.ball, dx, dy } };
  })
);
