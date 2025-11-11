import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameStateService } from '../../../game-state.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'game-state-message',
  imports: [CommonModule],
  templateUrl: './game-state-message.component.html',
  styleUrl: './game-state-message.component.scss',
})
export class GameStateMessageComponent implements OnInit, OnDestroy {
  public message: string = '';
  private gameStateSubscription!: Subscription;

  constructor(private gameStateService: GameStateService) {}

  ngOnInit(): void {
    this.gameStateSubscription = this.gameStateService.gameState$.subscribe(
      (gameState) => {
        gameState;
        switch (gameState) {
          case 'loading':
            this.message = 'Chargement ...';
            setTimeout(() => {
              this.message = '';
            }, 3000);
            break;
          case 'start':
            this.message = 'Début de la partie !';
            setTimeout(() => {
              this.message = '';
            }, 3000);
            break;
          default:
            this.message = gameState;
            setTimeout(() => {
              this.message = '';
            }, 3000);
            break;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }
}
