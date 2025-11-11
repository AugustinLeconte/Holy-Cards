import { Component, Input } from '@angular/core';
import { Card } from '../card.model';
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
  @Input() card!: Card;
  @Input() inHand: boolean = false;

  constructor(public familyService: FamilyService) {}
}
