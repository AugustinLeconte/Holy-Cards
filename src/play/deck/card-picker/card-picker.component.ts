import { Component, Input } from '@angular/core';
import { Card } from '../../../cards/card.model';
import { GameService } from '../../game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card-picker',
  imports: [CommonModule],
  templateUrl: './card-picker.component.html',
  styleUrl: './card-picker.component.scss',
})
export class CardPickerComponent {
  @Input() public isEnemy: boolean = false;
  public cards: Array<Card> = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.cards = this.gameService.getDeck();
  }

  pickCard() {
    this.gameService.pickCard();
  }
}
