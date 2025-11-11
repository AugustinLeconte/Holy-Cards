import { Component } from '@angular/core';
import { GameTimerService } from '../game-timer.service';

@Component({
  selector: 'game-pause',
  imports: [],
  templateUrl: './game-pause.component.html',
  styleUrl: './game-pause.component.scss',
})
export class GamePauseComponent {
  constructor(public gameTimerService: GameTimerService) {}
}
