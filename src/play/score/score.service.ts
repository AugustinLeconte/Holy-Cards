import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private score$: BehaviorSubject<number>;

  constructor() {
    this.score$ = new BehaviorSubject(10);
  }

  public setScoreCount(newValue: number): void {
    this.score$.next(newValue);
  }

  public pay(value: number): void {
    this.score$.next(this.score$.value - value);
  }

  public gain(value: number): void {
    this.score$.next(this.score$.value + value);
  }

  get scoreCount$(): Observable<number> {
    return this.score$.asObservable();
  }
}
