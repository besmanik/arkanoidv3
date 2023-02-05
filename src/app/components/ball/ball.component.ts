import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  changeDirection,
  setCoordinates,
} from 'src/app/store/ball/ball.actions';
import { selectBall } from 'src/app/store/ball/ball.selectors';
import { selectPaddle } from 'src/app/store/paddle/paddle.selectors';
import { IBall } from 'src/app/types/ball.interface';
import { IPaddle } from 'src/app/types/paddle.interface';

@Component({
  selector: 'mc-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BallComponent implements OnInit {
  progressX: number = 0;
  progressY: number = 0;
  ball: IBall;
  paddle: IPaddle;
  paddleWidth: number = 200;
  paddleHeight: number = 30;
  ballWidth: number = 20;
  ballHeight: number = 20;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectBall).subscribe((ball) => (this.ball = ball));
    this.store.select(selectPaddle).subscribe((paddle) => {
      this.paddle = paddle;
    });
  }

  ballMove(): void {
    const currentEl = this.el.nativeElement.querySelector('.ball');
    this.progressX += 10 * this.ball.dx;
    this.progressY += 10 * this.ball.dy;
    this.renderer.setStyle(
      currentEl,
      'transform',
      `translateY(${this.progressY}px)`
    );
    const { x: ballX, y: ballY } = currentEl.getBoundingClientRect();
    this.store.dispatch(setCoordinates({ x: ballX, y: ballY }));

    if (
      this.ball.x >= this.paddle.x - this.ballWidth / 2 &&
      this.ball.x <= this.paddle.x + this.paddleWidth - this.ballWidth / 2 &&
      this.ball.y >= this.paddle.y - this.ballHeight &&
      this.ball.isMoving
    ) {
      this.store.dispatch(
        changeDirection({ dx: this.ball.dx, dy: -this.ball.dy })
      );
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    if (e.code == 'Enter') {
      this.ballMove();
    } else if (e.code == 'Space') {
      this.store.dispatch(
        changeDirection({ dx: this.ball.dx, dy: -this.ball.dy })
      );
    }
  }
}
