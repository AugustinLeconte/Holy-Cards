import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Family, InGameFamily } from '../../families/family.model';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';
import { FamilyService } from '../../families/family.service';

@Component({
  selector: 'families-bonuses',
  imports: [CommonModule],
  templateUrl: './families-bonuses.component.html',
  styleUrl: './families-bonuses.component.scss',
})
export class FamiliesBonusesComponent implements OnInit, OnDestroy {
  @Input() public families: InGameFamily[] = [];
  @Input() public isEnemy: boolean = false;

  private inGameFamiliesSubscription!: Subscription;

  constructor(
    private gameService: GameService,
    public familyService: FamilyService
  ) {}

  ngOnInit() {
    this.inGameFamiliesSubscription =
      this.gameService.inGameFamilies$.subscribe((families) => {
        this.families = families;
      });
  }

  ngOnDestroy(): void {
    this.inGameFamiliesSubscription.unsubscribe();
  }

  public getFamilyStepDescription(family: InGameFamily) {
    const globalFamily = this.familyService.getFamily(family.id);
    let actualStep = -1;
    for (const step of globalFamily.steps) {
      if (step.nb <= family.actualSteps) actualStep += 1;
      else break;
    }
    if (actualStep == -1) actualStep = 0;
    this.gameService.setFamilyStep(family.id, actualStep);
    return globalFamily.steps[actualStep].bonus;
  }

  public isActive(family: InGameFamily) {
    const globalFamily = this.familyService.getFamily(family.id);
    return family.actualSteps >= globalFamily.steps[0].nb;
  }
}
