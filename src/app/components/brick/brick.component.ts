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
  widthBrick: number = 80;
  heightBrick: number = 30;
  widthBall: number = 20;
  heghtBall: number = 20;

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

      if (
        this.ball.x >= brickX &&
        this.ball.x <= brickX + this.widthBrick - this.widthBall / 2 &&
        this.ball.y >= brickY - this.heghtBall &&
        this.ball.y <= brickY + this.heightBrick &&
        this.ball.isMoving
      ) {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', 0);
        this.subscription.unsubscribe();
        this.store.dispatch(
          changeDirection({ dx: this.ball.dx, dy: -this.ball.dy })
        );
      }

      if (
        this.ball.x >= brickX - this.widthBall &&
        this.ball.x <= brickX + this.widthBrick &&
        this.ball.y >= brickY - this.heghtBall / 2 &&
        this.ball.y <= brickY + this.heghtBall &&
        this.ball.isMoving
      ) {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', 0);
        this.subscription.unsubscribe();
        this.store.dispatch(
          changeDirection({ dx: -this.ball.dx, dy: this.ball.dy })
        );
      }
    });
  }

  destroyBrick(id: number): void {
    this.store.dispatch(destroyBrick({ id }));
  }
}
