import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './card.model';
import cardsData from '../assets/data/cards.json';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private saintList: Array<Card> = cardsData as Array<Card>;

  constructor(private http: HttpClient) {}

  getCards() {
    return this.saintList;
  }
}
