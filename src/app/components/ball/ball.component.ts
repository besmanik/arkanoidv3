import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { setCoordinates } from 'src/app/store/ball/ball.actions';
import { selectBall } from 'src/app/store/ball/ball.selectors';
import { IBall } from 'src/app/types/ball.interface';

@Component({
  selector: 'mc-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnInit {
  progress: number = 10;
  ball: IBall;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectBall).subscribe((ball) => (this.ball = ball));
  }

  ballMove(): void {
    const currentEl = this.el.nativeElement.querySelector('.ball');
    this.progress += 10 * this.ball.dy;
    this.renderer.setStyle(
      currentEl,
      'transform',
      `translateY(${this.progress}px)`
    );
    const { x: ballX, y: ballY } = currentEl.getBoundingClientRect();
    this.store.dispatch(setCoordinates({ x: ballX, y: ballY }));
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    if (e.code == 'Enter') {
      this.ballMove();
    } else if (e.code == 'Space') {
    }
  }
}
