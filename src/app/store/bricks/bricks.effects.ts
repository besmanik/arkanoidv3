import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { selectAllBricks } from './bricks.selectors';
import {
  destroyBrick,
  loadBricks,
  loadBricksFailure,
  loadBricksSuccess,
} from './bricks.actions';
import { BricksService } from 'src/app/services/bricks.service';

@Injectable()
export class BricksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private bricksService: BricksService
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadBricks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBricks),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        from(this.bricksService.getBricks()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((bricks) => loadBricksSuccess({ bricks: bricks })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadBricksFailure({ error })))
        )
      )
    )
  );

  saveBricks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(destroyBrick),
        withLatestFrom(this.store.select(selectAllBricks)),
        switchMap(([action, bricks]) =>
          from(this.bricksService.saveBricks(bricks[action.id]))
        )
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
