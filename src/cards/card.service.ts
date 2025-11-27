import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, InGameCard } from './card.model';
import cardsData from '../assets/data/cards.json';
import specialCardsData from '../assets/data/bonusCards.json';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private saintList: Array<Card> = cardsData as Array<Card>;
  private specialCardList: Array<Card> = specialCardsData as Array<Card>;

  constructor() {}

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

  getSpecialCardsWithId(ids: string[]): InGameCard[] {
    return this.specialCardList
      .filter((card) => ids.includes(card.id))
      .map((card) => ({
        ...card,
        isBoosted: false,
        cost: card.baseCost,
        hp: card.baseHp,
        shield: 0,
        isActive: true,
      }));
  }
}
