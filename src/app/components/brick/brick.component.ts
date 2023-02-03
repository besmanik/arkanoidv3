import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { changeDirection } from 'src/app/store/ball/ball.actions';
import { selectBall } from 'src/app/store/ball/ball.selectors';
import { destroyBrick } from 'src/app/store/bricks/bricks.actions';
import { IBall } from 'src/app/types/ball.interface';
import { IBrick } from 'src/app/types/bricks.interface';

@Component({
  selector: 'mc-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.scss'],
})
export class BrickComponent implements OnInit {
  @Input() brick: IBrick;
  ball: IBall;
  subscription: Subscription;

  constructor(private store: Store, private el: ElementRef) {}

  ngOnInit(): void {
    this.subscription = this.store.select(selectBall).subscribe((ball) => {
      this.ball = ball;
      const { x: brickX, y: brickY } =
        this.el.nativeElement.getBoundingClientRect();
      console.log('BallY: ', this.ball.y);
      console.log(`${this.brick.id}. BrickY: `, brickY);
      if (brickY >= this.ball.y) {
        console.log('Connected');
      }
      //if (brickY >= this.ball.y) {
      //console.log('Connected');
      // this.store.dispatch(changeDirection({ dx: 1, dy: 1 }));
      //this.subscription.unsubscribe();
      //}
    });

    // let { x, y } = this.el.nativeElement
    //   .querySelector('.brick')
    //   .getBoundingClientRect();
    // console.log(x, y);
    //this.store.dispatch(addCoordinates({ id: this.brick.id, x, y }));
  }

  destroyBrick(id: number): void {
    this.store.dispatch(destroyBrick({ id }));
  }

  ngon;
}
