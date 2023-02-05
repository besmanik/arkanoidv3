import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from 'src/app/constants/globakVariables';
import {
  changeDirection,
  endGame,
  setCoordinates,
  startGame,
} from 'src/app/store/ball/ball.actions';
import { selectBall } from 'src/app/store/ball/ball.selectors';
import { selectAllBricks } from 'src/app/store/bricks/bricks.selectors';
import { selectPaddle } from 'src/app/store/paddle/paddle.selectors';
import { IBall } from 'src/app/types/ball.interface';
import { IPaddle } from 'src/app/types/paddle.interface';

@Component({
  selector: 'mc-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnInit {
  progressX: number = 0;
  progressY: number = 0;
  ball: IBall;
  paddle: IPaddle;
  paddleWidth: number = 200;
  paddleHeight: number = 30;
  bricksLength: number;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(startGame());

    this.store
      .select(selectAllBricks)
      .subscribe(
        (bricks) =>
          (this.bricksLength = bricks.filter(
            (brick) => brick.status === true
          ).length)
      );
    this.store.select(selectBall).subscribe((ball) => (this.ball = ball));
    this.store
      .select(selectPaddle)
      .subscribe((paddle) => (this.paddle = paddle));
  }

  ballMove(): void {
    const currentEl = this.el.nativeElement.querySelector('.ball');
    this.progressX += 3 * this.ball.dx;
    this.progressY += 3 * this.ball.dy;
    this.renderer.setStyle(
      currentEl,
      'transform',
      `translate(${this.progressX}px, ${this.progressY}px)`
    );
    const { x: ballX, y: ballY } = currentEl.getBoundingClientRect();
    this.store.dispatch(setCoordinates({ x: ballX, y: ballY }));
    // console.log('Ball: ', this.ball);
    // console.log('Paddle: ', this.paddle);

    console.log('BallScore: ', this.ball.score);
    console.log('BricksLength: ', this.bricksLength);
    if (ballY >= 550 || this.ball.score == this.bricksLength) {
      console.log('Game Over');
      this.progressX = 0;
      this.progressY = 0;
      this.renderer.setStyle(currentEl, 'transform', `translate(0px, 0px)`);
      this.store.dispatch(endGame());
    } else {
      if (
        ballX >= this.paddle.x - this.ball.diameter / 2 &&
        ballX <= this.paddle.x + this.paddleWidth - this.ball.diameter / 2 &&
        ballY >= this.paddle.y - this.ball.diameter &&
        ballY <= this.paddle.y + this.paddleHeight &&
        this.ball.isMoving
      ) {
        this.store.dispatch(
          changeDirection({ dx: this.ball.dx, dy: -this.ball.dy })
        );
      }

      if (ballY <= 80 && this.ball.isMoving) {
        this.store.dispatch(
          changeDirection({ dx: this.ball.dx, dy: -this.ball.dy })
        );
      } else if (
        (ballX <= this.ball.diameter / 2 ||
          ballX >= Board.Width - this.ball.diameter) &&
        this.ball.isMoving
      ) {
        this.store.dispatch(
          changeDirection({ dx: -this.ball.dx, dy: this.ball.dy })
        );
      }

      requestAnimationFrame(() => this.ballMove());
    }

    //
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    if (e.code == 'Enter') {
      this.store.dispatch(startGame());
      this.ballMove();
    } else if (e.code == 'Space') {
      this.store.dispatch(
        changeDirection({ dx: this.ball.dx, dy: -this.ball.dy })
      );
    }
  }
}
