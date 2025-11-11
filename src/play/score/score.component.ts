import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'score',
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent implements OnInit, OnDestroy {
  public score: number = 0;
  private scoreSubscription: Subscription | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.scoreSubscription = this.gameService.score$.subscribe(
      (score) => (this.score = score)
    );
  }

  ngOnDestroy(): void {
    this.scoreSubscription?.unsubscribe();
    this.scoreSubscription = null;
  }
}
