import { Component, Input } from '@angular/core';
import { Card, InGameCard } from '../card.model';
import { CommonModule } from '@angular/common';
import { FamilyService } from '../../families/family.service';

@Component({
  selector: 'card-preview',
  imports: [CommonModule],
  templateUrl: './card-preview.component.html',
  styleUrl: './card-preview.component.scss',
})
export class CardPreviewComponent {
  @Input() isEnemy: boolean = false;
  @Input() card!: Card | InGameCard;
  @Input() inHand: boolean = false;

  constructor(public familyService: FamilyService) {}

  isInGameCard(card: Card | InGameCard): card is InGameCard {
    return 'isBoosted' in card;
  }
}
