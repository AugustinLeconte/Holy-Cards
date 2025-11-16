import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Card } from '../../../cards/card.model';
import { Subscription } from 'rxjs';
import { GameService } from '../../game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'flying-card',
  imports: [CommonModule],
  templateUrl: './flying-card.component.html',
  styleUrl: './flying-card.component.scss',
})
export class FlyingCardComponent {
  public flyingCard: {
    card: Card | null;
    x: number;
    y: string;
    midAir: boolean;
  } = {
    card: null,
    x: -120,
    y: 'calc(50% + 10vh)',
    midAir: false,
  };
  private flyingCardSubscription: Subscription | null = null;

  @ViewChildren('handCard', { read: ElementRef })
  handCards!: QueryList<ElementRef>;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.flyingCardSubscription = this.gameService.flyingCards$.subscribe(
      (flyingCard) => {
        if (flyingCard.id) {
          this.flyingCard.card = flyingCard;
          console.log('INIT');
          this.pickCard();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.flyingCardSubscription?.unsubscribe();
    this.flyingCardSubscription = null;
  }

  public pickCard(): void {
    setTimeout(() => {
      const targetX = 100 + this.handCards.length * 120;
      const targetY = '700px';

      setTimeout(() => {
        this.flyingCard.midAir = true;
      }, 100);

      this.flyingCard.x = targetX;
      this.flyingCard.y = targetY;

      setTimeout(() => {
        if (this.flyingCard.card && this.flyingCard.card.id)
          this.gameService.setCardToHand(this.flyingCard.card);
        this.flyingCard = {
          card: null,
          x: -120,
          y: 'calc(50% + 10vh)',
          midAir: false,
        };
      }, 350);
    });
  }
}
