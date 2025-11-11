import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  private fire$: BehaviorSubject<number>;

  constructor() {
    this.fire$ = new BehaviorSubject(10);
  }

  public setFireCount(newValue: number): void {
    this.fire$.next(newValue);
  }

  public pay(value: number): void {
    this.fire$.next(this.fire$.value - value);
  }

  public gain(value: number): void {
    this.fire$.next(this.fire$.value + value);
  }

  get fireCount$(): Observable<number> {
    return this.fire$.asObservable();
  }
}
