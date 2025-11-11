import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesBonusesComponent } from './families-bonuses.component';

describe('FamiliesBonusesComponent', () => {
  let component: FamiliesBonusesComponent;
  let fixture: ComponentFixture<FamiliesBonusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamiliesBonusesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamiliesBonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
