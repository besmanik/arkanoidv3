import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBricks } from 'src/app/store/bricks/bricks.actions';
import { selectAllBricks } from 'src/app/store/bricks/bricks.selectors';

@Component({
  selector: 'mc-bricks',
  templateUrl: './bricks.component.html',
  styleUrls: ['./bricks.component.scss'],
})
export class BricksComponent implements OnInit {
  allBricks$ = this.store.select(selectAllBricks);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadBricks());
  }
}
