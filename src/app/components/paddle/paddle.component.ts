import {
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { changeDirection } from 'src/app/store/ball/ball.actions';
import { selectBall } from 'src/app/store/ball/ball.selectors';
import { setPaddleCoordinates } from 'src/app/store/paddle/paddle.actions';
import { IBall } from 'src/app/types/ball.interface';

@Component({
  selector: 'mc-paddle',
  templateUrl: './paddle.component.html',
  styleUrls: ['./paddle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaddleComponent implements OnInit {
  paddleWidth: number = 200;
  paddleHeight: number = 30;

  constructor(
    private store: Store,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {}

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove(e: MouseEvent): void {
    if (e.clientX - this.paddleWidth / 2 > 0) {
      const paddle = this.el.nativeElement.querySelector('.paddle');
      this.renderer.setStyle(
        paddle,
        'transform',
        `translateX(${e.clientX - this.paddleWidth / 2}px)`
      );
      const { x, y } = paddle.getBoundingClientRect();
      this.store.dispatch(setPaddleCoordinates({ x, y }));
    }
  }
}
