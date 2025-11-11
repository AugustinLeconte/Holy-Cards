import { Component, OnDestroy, OnInit } from '@angular/core';
import { GamePauseComponent } from '../game-pause/game-pause.component';
import { CommonModule } from '@angular/common';
import { GameTimerService } from '../game-timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'game-timer',
  imports: [GamePauseComponent, CommonModule],
  templateUrl: './game-timer.component.html',
  styleUrl: './game-timer.component.scss',
})
export class GameTimerComponent {
  constructor(public timer: GameTimerService) {}
}
