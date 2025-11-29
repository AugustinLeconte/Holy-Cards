import { Injectable } from '@angular/core';
import { InGameCard } from '../cards/card.model';
import { CardService } from '../cards/card.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GameStateService } from './game-state.service';
import { FireService } from './fire/fire.service';
import { InGameFamily } from '../families/family.model';
import { FamilyService } from '../families/family.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private deck = new BehaviorSubject<Array<InGameCard>>([]);
  deck$ = this.deck.asObservable();
  private handedCards = new BehaviorSubject<Array<InGameCard>>([]);
  handedCards$ = this.handedCards.asObservable();
  private terrainCards = new BehaviorSubject<Array<InGameCard>>([]);
  terrainCards$ = this.terrainCards.asObservable();
  private inGameFamilies = new BehaviorSubject<Array<InGameFamily>>([]);
  inGameFamilies$ = this.inGameFamilies.asObservable();
  private score = new BehaviorSubject<{ score: number; maxScore: number }>({
    score: 0,
    maxScore: 200,
  });
  score$ = this.score.asObservable();
  private flyingCards = new BehaviorSubject<InGameCard>({} as InGameCard);
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
    private fireService: FireService,
    private familyService: FamilyService
  ) {
    this.deck.next(this.cardService.getCards());
    this.shuffleDeck();
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
    this.getCardsPassiveBonuses();
    //TODO => ICI VOIR SI LA CARTE A UN COUT + BAS;
    this.pickCard();
  }

  private getCardsPassiveBonuses() {
    let cardsPassiveBonus: number = 0;
    let cardsPassiveFire: number = 0;
    this.terrainCards.value.forEach((card) => {
      if (card.isActive) {
        cardsPassiveBonus += card.isBoosted
          ? card.passiveGain.points * 2
          : card.passiveGain.points;
        cardsPassiveFire += card.isBoosted
          ? card.passiveGain.fire * 2
          : card.passiveGain.fire;
      }
    });
    this.score.next({
      score: this.score.value.score + cardsPassiveBonus,
      maxScore: this.score.value.maxScore,
    });
    this.fireService.gain(this.turns.value.turnNb + cardsPassiveFire);
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
    let playedCard = this.handedCards.value.splice(index, 1)[0];
    playedCard.shield += playedCard.activeGain.shield;
    this.terrainCards.value.push(playedCard);
    this.playCardSpecialActiveAction(playedCard);
    this.playCardSpecialPassiveAction();
    this.fireService.pay(playedCard.cost);
    this.fireService.gain(playedCard.activeGain.fire);
    this.score.next({
      //TODO => remplacer par un autre service
      score: this.score.value.score + playedCard.activeGain.points,
      maxScore: this.score.value.maxScore,
    });
    this.addFamilyBonus(playedCard);
  }

  private playCardSpecialActiveAction(playedCard: InGameCard) {
    switch (playedCard.id) {
      case '000-0000-1002':
        this.addCardsInDeck(this.cardService.getSpecialCardsWithId(['0']));
        break;
      case '000-0000-1003':
        this.addCardsInDeck(this.cardService.getSpecialCardsWithId(['1']));
        this.addCardsInDeck(this.cardService.getSpecialCardsWithId(['1']));
        this.addCardsInDeck(this.cardService.getSpecialCardsWithId(['1']));
        break;
      default:
        break;
    }
  }

  private playCardSpecialPassiveAction() {
    const updatedCards = this.terrainCards.value.map((card) => {
      const updatedCard = { ...card };

      switch (updatedCard.id) {
        case '000-0000-1001':
          this.applyBoostToAdjacentCards(updatedCard);
          break;

        case '000-0000-1004':
          updatedCard.passiveGain.points = this.addCardPointsFromFamilies(
            ['2', '3'],
            updatedCard.id
          );
          break;
      }

      return updatedCard;
    });

    this.terrainCards.next(updatedCards);
  }

  private addCardPointsFromFamilies(familyList: string[], cardId: string) {
    let points: number = 0;
    for (let card of this.terrainCards.value) {
      if (
        card.families.some((f) => familyList.includes(f)) &&
        card.id != cardId
      )
        points += 1;
    }
    return points;
  }

  private addCardsInDeck(cards: InGameCard[]): void {
    const deck = [...this.deck.value];

    cards.forEach((card) => {
      const idx = Math.floor(Math.random() * (deck.length + 1));
      deck.splice(0, 0, card);
    });

    this.deck.next(deck);
  }

  private applyBoostToAdjacentCards(playedCard: InGameCard) {
    const cards = [...this.terrainCards.value];
    const index = cards.findIndex((c) => c.id === playedCard.id);

    console.log(index);

    if (index === -1) return;

    if (cards[index - 1]) {
      cards[index - 1] = {
        ...cards[index - 1],
        isBoosted:
          cards[index + 1].passiveGain.description != '' ? true : false,
      };
    }

    if (cards[index + 1]) {
      cards[index + 1] = {
        ...cards[index + 1],
        isBoosted:
          cards[index + 1].passiveGain.description != '' ? true : false,
      };
    }

    this.terrainCards.next(cards);
  }

  public addFamilyBonus(playedCard: InGameCard) {
    playedCard.families.forEach((familyId) => {
      const newFamilyStats = this.familyService.getFamily(familyId);
      const index = this.inGameFamilies.value.findIndex(
        (inGameFamily) => inGameFamily.id == familyId
      );

      if (index >= 0) {
        let newInGameFamily = this.inGameFamilies.value;
        newInGameFamily[index].actualSteps += 1;
        for (const family of newFamilyStats.steps) {
          if (
            newInGameFamily[index].actualSteps === family.nb &&
            newInGameFamily[index].passedSteps < family.nb
          ) {
            newInGameFamily[index].passedSteps = family.nb;
            this.score.next({
              score: this.score.value.score + family.activeGain,
              maxScore: this.score.value.maxScore,
            });
            newInGameFamily[index].passiveGain = family.passiveGain;
            newInGameFamily[index].passiveFire = family.passiveFire;
            newInGameFamily[index].activeGain = family.activeGain;
            break;
          }
        }
        this.inGameFamilies.next(newInGameFamily);
      } else {
        this.inGameFamilies.value.push({
          id: familyId,
          actualSteps: 1, //TODO => RENOMMER CA EN NB_CARDS
          passedSteps: 0, //TODO => PASSER TOUT CA DANS LES STEPS DES FAMILLES PAR DEFAUT, GARDER LES PASSIFS
          passiveGain: newFamilyStats.steps[0].passiveGain,
          activeGain: newFamilyStats.steps[0].activeGain,
          passiveFire: newFamilyStats.steps[0].passiveFire,
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

  public getDeck(): Array<InGameCard> {
    return this.deck.value;
  }

  public pickCard(): void {
    //TODO => ANIMATION POUR L'AJOUT DES CARTES DANS LA MAIN
    const pickedCard: InGameCard = this.deck.value.splice(0, 1)[0];
    this.flyingCards.next(pickedCard);
  }

  public setCardToHand(card: InGameCard): void {
    if (card) this.handedCards.value.push(card);
    this.flyingCards.next({} as InGameCard);
  }

  public getHandedCards(): Array<InGameCard> {
    return this.handedCards.value;
  }

  ngOnDestroy(): void {
    this.gameStateSubscription.unsubscribe();
  }
}
