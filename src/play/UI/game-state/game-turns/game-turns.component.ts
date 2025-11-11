import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../../game.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../game-state.service';

@Component({
  selector: 'game-turns',
  imports: [CommonModule],
  templateUrl: './game-turns.component.html',
  styleUrl: './game-turns.component.scss',
})
export class GameTurnsComponent implements OnInit, OnDestroy {
  public turn: number = 0;
  public turnMessage: string = '';
  public isEnemyTurn: boolean = false;
  private gameServiceSubscription!: Subscription;

  constructor(
    private gameService: GameService,
    private gameStateService: GameStateService
  ) {}

  ngOnInit(): void {
    this.gameServiceSubscription = this.gameService.turns$.subscribe((turn) => {
      this.isEnemyTurn = !turn.isPlayerTurn;
      this.turnMessage = this.isEnemyTurn ? 'Tour ennemi' : 'Mon tour';
      this.turn = turn.turnNb;
      if (turn.enemyPlayed == false && turn.playerPlayed == false)
        switch (turn.turnNb) {
          case 0:
            break;
          case 1:
            this.gameStateService.setGameState('1er tour');
            break;
          case 2:
            this.gameStateService.setGameState('2nd tour');
            break;
          default:
            this.gameStateService.setGameState(
              this.turn.toString() + 'eme tour'
            );
            break;
        }

      if (this.isEnemyTurn) {
        setTimeout(() => {
          this.endPlayerTurn();
        }, 3000);
      }
    });
  }

  public endPlayerTurn(): void {
    this.gameService.endUserTurn();
  }

  ngOnDestroy(): void {
    this.gameServiceSubscription.unsubscribe();
  }
}
