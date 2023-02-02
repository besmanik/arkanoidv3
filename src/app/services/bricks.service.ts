import { Injectable } from '@angular/core';
import { IBrick } from '../types/bricks.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BricksService {
  constructor(private http: HttpClient) {}

  getBricks(): Observable<IBrick[]> {
    return this.http.get<IBrick[]>('http://localhost:3000/bricks');
  }

  saveBricks(bricks: IBrick[]) {
    console.log('Bricks in service: ', bricks);
    return this.http.put<IBrick[]>(
      'http://localhost:3000/bricks/1',
      bricks,
      httpOptions
    );
  }
}
