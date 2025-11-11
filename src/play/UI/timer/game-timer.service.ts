import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  map,
  Observable,
  Subscription,
  takeUntil,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameTimerService {
  private timeLeft: number = 300;
  private timer$: BehaviorSubject<number>;
  private timeSubscription: Subscription | null = null;

  constructor() {
    this.timer$ = new BehaviorSubject(this.timeLeft);
  }

  get remaining$(): Observable<number> {
    return this.timer$.asObservable();
  }

  public play(): void {
    if (this.timeSubscription) return;
    console.log('play');

    this.timeSubscription = interval(1)
      .pipe(
        map(() => this.timeLeft--),
        takeUntil(this.timer$.pipe(map((v) => v <= 0)))
      )
      .subscribe((value) => {
        console.log(this.timeLeft);
        this.timer$.next(value);
      });
  }

  public pause(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
      this.timeSubscription = null;
    }
  }

  public reset(initialValue = this.timeLeft): void {
    this.pause();
    this.timeLeft = initialValue;
  }
}
