import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardPickerComponent } from '../deck/card-picker/card-picker.component';
import { HandComponent } from '../deck/hand/hand.component';
import { ScoreComponent } from '../score/score.component';
import { FamiliesBonusesComponent } from '../families-bonuses/families-bonuses.component';
import { FireComponent } from '../fire/fire.component';
import { GameTerrainComponent } from '../game-terrain/game-terrain.component';
import { GameService } from '../game.service';
import { FlyingCardComponent } from '../deck/flying-card/flying-card.component';

@Component({
  selector: 'game-view',
  imports: [
    CommonModule,
    CardPickerComponent,
    HandComponent,
    ScoreComponent,
    FamiliesBonusesComponent,
    FireComponent,
    GameTerrainComponent,
  ],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.scss',
})
export class GameViewComponent {
  @Input() isEnemy: boolean = false;

  constructor(public gameService: GameService) {}
}
