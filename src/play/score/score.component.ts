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
  public maxScore: number = 100;
  private scoreSubscription: Subscription | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.scoreSubscription = this.gameService.score$.subscribe(
      (score) => ((this.maxScore = score.maxScore), (this.score = score.score))
    );
  }

  getScoreWidth(): string {
    const ratio = Math.min(this.score / this.maxScore, 1);
    return `${ratio * 100}%`;
  }

  ngOnDestroy(): void {
    this.scoreSubscription?.unsubscribe();
    this.scoreSubscription = null;
  }
}
