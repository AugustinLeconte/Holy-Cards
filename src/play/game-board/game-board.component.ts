import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameViewComponent } from '../game-view/game-view.component';
import { GameCtrElementsComponent } from '../UI/game-ctr-elements/game-ctr-elements.component';

@Component({
  selector: 'app-game-board',
  imports: [GameViewComponent, GameCtrElementsComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {
  constructor(private router: Router) {}

  public navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
