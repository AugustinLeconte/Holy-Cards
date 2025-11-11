import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private gameState = new BehaviorSubject<string>('loading');
  gameState$ = this.gameState.asObservable();

  constructor() {}

  public setGameState(newGameState: string): void {
    this.gameState.next(newGameState);
  }
}
