import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private saintList: Array<Card> = [
    {
      id: '000-0000-0001',
      illustration: 'SteMarie.jpeg',
      name: 'Sainte Marie',
      description: 'Mère de Dieu',
      type: 'legendary',
      level: 10,
      families: ['1'],
      baseCost: 10,
      cost: 10,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StMichel.jpg',
      name: 'St Michel Archange',
      description: 'Archange combattant le dragon',
      type: 'legendary',
      level: 9,
      families: ['5'],
      baseCost: 8,
      cost: 8,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StJean.jpg',
      name: 'St Jean',
      description: 'Disciple bien aimé',
      type: 'mythic',
      level: 8,
      families: ['2', '6'],
      baseCost: 4,
      cost: 4,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StFrancoisAssise.jpg',
      name: 'St François d Assise',
      description: 'Ami des bêtes',
      type: 'rare',
      level: 7,
      families: [],
      baseCost: 0,
      cost: 0,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'SteBarbara.jpg',
      name: 'Sainte Barbara',
      description: 'Princesse',
      type: 'commun',
      level: 6,
      families: ['7'],
      baseCost: 0,
      cost: 0,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StPaul.jpg',
      name: 'Paul',
      description: 'Apotre des païens',
      type: 'mythic',
      level: 5,
      families: ['2', '0'],
      baseCost: 0,
      cost: 0,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StPierre.jpeg',
      name: 'Pierre',
      description: 'Premier pape',
      type: 'mythic',
      level: 4,
      families: ['2', '3', '0'],
      baseCost: 0,
      cost: 0,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StJacques.jpeg',
      name: 'Jacques',
      description: '',
      type: 'mythic',
      level: 3,
      families: ['2', '0'],
      baseCost: 0,
      cost: 0,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StMatthieu.jpg',
      name: 'Matthieu',
      description:
        'Ancien collecteur d impots devenu disciple de Jésus et Evangeliste',
      type: 'mythic',
      level: 2,
      families: ['2', '6', '0'],
      baseCost: 0,
      cost: 0,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StAndre.jpg',
      name: 'André',
      description: 'Un des premiers disciples',
      type: 'mythic',
      level: 1,
      families: ['2', '0'],
      baseCost: 0,
      cost: 0,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
    {
      id: '000-0000-0001',
      illustration: 'StSimonZelote.jpeg',
      name: 'Simon le Zélote',
      description: '',
      type: 'mythic',
      level: 0,
      families: ['2', '0'],
      baseCost: 0,
      cost: 0,
      baseDamage: 0,
      damage: 0,
      baseHp: 0,
      hp: 0,
    },
  ];

  constructor(private http: HttpClient) {}

  getCards() {
    return this.saintList;
  }
}

/* AVOIR DES CARTES QUI : 
- BAISSENT LE COUT DES AUTRES CARTES DANS LE DECK "APPEL A LA PRIERE / MISSION" 
- PIOCHE DES CARTES ALEATOIRE DANS LE DECK
- MELANGE LE DECK
*/

/*
Jacques Thadee
Jude
Philippe
Lucas
Marc
Carlos Acutis
Mere Teresa
Pier Gieorgio Frassati
Saint Georges
Saint Bruno
Saint Antoine de Padoue
Sainte Faustine
Sainte Anastasie
Saint Augustin
Sainte Monique
Sainte Anne
Saint Joachim
Sainte Claire d'assise
Sainte Therese de l'enfant Jésus
Saint Jean Paul II
Saint Mayeul
Saint Olivier
Saint Clotilde
Saint Louis Roi de France
*/
