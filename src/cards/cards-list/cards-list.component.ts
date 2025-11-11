import { Component } from '@angular/core';
import { CardPreviewComponent } from '../card-preview/card-preview.component';
import { Card } from '../card.model';
import { CardService } from '../card.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'cards-list',
  imports: [CardPreviewComponent, CommonModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
})
export class CardsListComponent {
  public cards: Array<Card> = [];
  public isLoading: boolean = false;

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit() {
    this.cards = this.cardService.getCards();
  }

  public navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
