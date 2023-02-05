import { Component } from '@angular/core';
import { Board } from './constants/globakVariables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  board = Board;
  title = 'arkanoid-3';
}
