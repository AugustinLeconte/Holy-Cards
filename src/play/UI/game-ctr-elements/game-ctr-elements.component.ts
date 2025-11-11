import { Component } from '@angular/core';
import { GameTimerComponent } from '../timer/game-timer/game-timer.component';
import { GameTurnsComponent } from '../game-state/game-turns/game-turns.component';
import { GameStateMessageComponent } from '../game-state/game-state-message/game-state-message.component';
import { GameService } from '../../game.service';

@Component({
  selector: 'game-ctr-elements',
  imports: [GameTimerComponent, GameTurnsComponent, GameStateMessageComponent],
  templateUrl: './game-ctr-elements.component.html',
  styleUrl: './game-ctr-elements.component.scss',
})
export class GameCtrElementsComponent {
  constructor(private gameService: GameService) {
    this.gameService.startGame();
  }
}
