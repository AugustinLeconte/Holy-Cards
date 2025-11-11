import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../../cards/card.model';
import { GameService } from '../../game.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CardPreviewComponent } from '../../../cards/card-preview/card-preview.component';
import { FireService } from '../../fire/fire.service';

@Component({
  selector: 'hand',
  imports: [CommonModule, CardPreviewComponent],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.scss',
})
export class HandComponent implements OnInit, OnDestroy {
  @Input() public isEnemy: boolean = false;
  public cards: Array<Card> = [];
  public fireCount: number = 0;
  private cardsSubscription: Subscription | null = null;
  private fireSubscription: Subscription | null = null;

  public selectedCardId: number | null = null;

  constructor(
    private gameService: GameService,
    private fireService: FireService
  ) {}

  ngOnInit() {
    this.cardsSubscription = this.gameService.handedCards$.subscribe(
      (cards) => (this.cards = cards)
    );
    this.fireSubscription = this.fireService.fireCount$.subscribe(
      (fire) => (this.fireCount = fire)
    );
  }

  public putCardOnTerrain(): void {
    if (this.selectedCardId != null) {
      this.gameService.putCardOnTerrain(this.selectedCardId);
      this.selectedCardId = null;
    }
  }

  ngOnDestroy(): void {
    this.cardsSubscription?.unsubscribe();
    this.fireSubscription?.unsubscribe();
    this.cardsSubscription = null;
    this.fireSubscription = null;
  }
}
