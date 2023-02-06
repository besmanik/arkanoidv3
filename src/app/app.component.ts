import { Component } from '@angular/core';
import { Board } from './constants/Board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  Board = Board;
}
