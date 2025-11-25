import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, InGameCard } from './card.model';
import cardsData from '../assets/data/cards.json';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private saintList: Array<Card> = cardsData as Array<Card>;

  constructor(private http: HttpClient) {}

  getCards(): InGameCard[] {
    return this.saintList.map((card) => ({
      ...card,
      isBoosted: false,
      cost: card.baseCost,
      hp: card.baseHp,
      shield: 0,
      isActive: true,
    }));
  }
}
