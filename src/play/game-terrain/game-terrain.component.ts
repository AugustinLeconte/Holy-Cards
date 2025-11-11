import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../../cards/card.model';
import { GameService } from '../game.service';
import { CardPreviewComponent } from '../../cards/card-preview/card-preview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'game-terrain',
  imports: [CardPreviewComponent, CommonModule],
  templateUrl: './game-terrain.component.html',
  styleUrl: './game-terrain.component.scss',
})
export class GameTerrainComponent implements OnInit, OnDestroy {
  public cards: Array<Card> = [];
  private cardsSubscription!: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.cardsSubscription = this.gameService.terrainCards$.subscribe(
      (cards) => {
        this.cards = cards;
      }
    );
  }

  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
  }
}
