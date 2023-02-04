import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ChangeDetectionStrategy,
  Renderer2,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrickComponent implements OnInit {
  @Input() brick: IBrick;
  ball: IBall;
  subscription: Subscription;

  constructor(
    private store: Store,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select(selectBall).subscribe((ball) => {
      this.ball = ball;
      const { x: brickX, y: brickY } =
        this.el.nativeElement.getBoundingClientRect();
      // console.log('Ball: ', this.ball);
      // console.log(
      //   `${this.brick.id}. Brick: `,
      //   this.el.nativeElement.getBoundingClientRect()
      // );

      if (
        brickY >= this.ball.y - 50 &&
        brickY <= this.ball.y + 40 &&
        brickX <= this.ball.x - 10 &&
        this.ball.x - 8 <= brickX + 100 &&
        this.ball.isMoving
      ) {
        // 50 - brick Height, 10 - ballX radius, 100-brick Width, 20 - ballX diameter
        console.log('Connected horizontally');
        // this.renderer.setStyle(this.el.nativeElement, 'opacity', 0);
        // this.subscription.unsubscribe();
        // this.store.dispatch(
        //   changeDirection({ dx: this.ball.dx, dy: -this.ball.dy })
        // );
      }

      if (
        brickY <= this.ball.y &&
        this.ball.y <= brickY + 50 &&
        brickX <= this.ball.x + 10 &&
        this.ball.x <= brickX + 110 &&
        this.ball.isMoving
      ) {
        console.log('Connected vertically');
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
  }

  destroyBrick(id: number): void {
    this.store.dispatch(destroyBrick({ id }));
  }

  ngon;
}
