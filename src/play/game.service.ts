import { Injectable } from '@angular/core';
import { Card } from '../cards/card.model';
import { CardService } from '../cards/card.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameStateService } from './game-state.service';
import { FireService } from './fire/fire.service';
import { InGameFamily } from '../families/family.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private deck = new BehaviorSubject<Array<Card>>([]);
  deck$ = this.deck.asObservable();
  private handedCards = new BehaviorSubject<Array<Card>>([]);
  handedCards$ = this.handedCards.asObservable();
  private terrainCards = new BehaviorSubject<Array<Card>>([]);
  terrainCards$ = this.terrainCards.asObservable();
  private inGameFamilies = new BehaviorSubject<Array<InGameFamily>>([]);
  inGameFamilies$ = this.inGameFamilies.asObservable();
  private score = new BehaviorSubject<{ score: number; maxScore: number }>({
    score: 0,
    maxScore: 200,
  });
  score$ = this.score.asObservable();
  private flyingCards = new BehaviorSubject<Card>({} as Card);
  flyingCards$ = this.flyingCards.asObservable();

  private gameState: string = '';
  private gameStateSubscription!: Subscription;

  private turns = new BehaviorSubject<{
    turnNb: number;
    isPlayerTurn: boolean;
    playerPlayed: boolean;
    enemyPlayed: boolean;
  }>({
    turnNb: 0,
    isPlayerTurn: false,
    playerPlayed: true,
    enemyPlayed: true,
  });
  turns$ = this.turns.asObservable();

  constructor(
    private cardService: CardService,
    private gameStateService: GameStateService,
    private fireService: FireService
  ) {
    this.deck.next(this.cardService.getCards());
    this.handedCards.next(this.deck.value.splice(0, 3));
  }

  ngOnInit(): void {
    this.gameStateSubscription = this.gameStateService.gameState$.subscribe(
      (gameState) => {
        this.gameState = gameState;
      }
    );

    this.gameStateService.setGameState('loading');
  }

  private shuffleDeck(): void {
    const array = this.deck.value;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.deck.next(array);
  }

  public startGame(): void {
    this.shuffleDeck();
    this.turns.next({
      turnNb: 1,
      isPlayerTurn: this.chooseFirstPlayer(),
      playerPlayed: false,
      enemyPlayed: false,
    });
  }

  public chooseFirstPlayer(): boolean {
    return Math.random() < 0.5 ? true : false;
  }

  public endUserTurn(): void {
    const playerTurn: boolean = this.turns.value.isPlayerTurn;
    if (
      this.turns.value.playerPlayed == false &&
      this.turns.value.enemyPlayed == false
    ) {
      this.turns.next({
        turnNb: this.turns.value.turnNb,
        isPlayerTurn: !this.turns.value.isPlayerTurn,
        playerPlayed: playerTurn ? true : false,
        enemyPlayed: playerTurn ? false : true,
      });
    } else if (
      this.turns.value.playerPlayed == true ||
      this.turns.value.enemyPlayed == true
    ) {
      this.turns.next({
        turnNb: this.turns.value.turnNb + 1,
        isPlayerTurn: !this.turns.value.isPlayerTurn,
        playerPlayed: false,
        enemyPlayed: false,
      });

      this.startNewRound();
    }
  }

  private startNewRound() {
    this.getFamiliesBonuses();
    //TODO => ICI VOIR SI LA CARTE A UN COUT + BAS;
    this.pickCard();
  }

  private getFamiliesBonuses(): void {
    let familiesPassiveBonus: number = 0;
    let familiesPassiveFire: number = 0;
    this.inGameFamilies.value.forEach((family) => {
      //if (family.isActive) {} //TODO => A RAJOUTER AVANT
      familiesPassiveBonus += family.passiveGain;
      familiesPassiveFire += family.passiveFire;
    });
    this.score.next({
      score: this.score.value.score + familiesPassiveBonus,
      maxScore: this.score.value.maxScore,
    });
    this.fireService.gain(this.turns.value.turnNb + familiesPassiveFire);
  }

  public putCardOnTerrain(index: number) {
    const playedCard = this.handedCards.value.splice(index, 1)[0];
    this.terrainCards.value.push(playedCard);
    this.fireService.pay(playedCard.cost);
    this.addFamilyBonus(playedCard);
  }

  public addFamilyBonus(playedCard: Card) {
    playedCard.families.forEach((familyId) => {
      const index = this.inGameFamilies.value.findIndex(
        (inGameFamily) => inGameFamily.id == familyId
      );

      if (index >= 0) {
        let newInGameFamily = this.inGameFamilies.value;
        newInGameFamily[index].actualSteps += 1;
        this.inGameFamilies.next(newInGameFamily);
      } else {
        this.inGameFamilies.value.push({
          id: familyId,
          actualSteps: 1, //TODO => RENOMMER CA EN NB_CARDS
          passedSteps: 0, //TODO => PASSER TOUT CA DANS LES STEPS DES FAMILLES PAR DEFAUT, GARDER LES PASSIFS
          passiveGain: 1,
          activeGain: 0,
          passiveFire: 0,
          //TODO => AJOUTER UN IS_ACTIVE
        });
      }
    });
  }

  public setFamilyStep(familyId: string, newStep: number): void {
    const index = this.inGameFamilies.value.findIndex(
      (inGameFamily) => inGameFamily.id == familyId
    );
    if (!index) return;
    //console.log(newStep); //TODO => REVERIFIER CA
    let newInGameFamily = this.inGameFamilies.value;
    newInGameFamily[index].passedSteps = newStep;
    this.inGameFamilies.next(newInGameFamily);
  }

  public getDeck(): Array<Card> {
    return this.deck.value;
  }

  public pickCard(): void {
    //TODO => ANIMATION POUR L'AJOUT DES CARTES DANS LA MAIN
    const pickedCard: Card = this.deck.value.splice(0, 1)[0];
    this.flyingCards.next(pickedCard);
  }

  public setCardToHand(card: Card): void {
    if (card) this.handedCards.value.push(card);
    this.flyingCards.next({} as Card);
  }

  public getHandedCards(): Array<Card> {
    return this.handedCards.value;
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }
}
