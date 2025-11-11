import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTurnsComponent } from './game-turns.component';

describe('GameTurnsComponent', () => {
  let component: GameTurnsComponent;
  let fixture: ComponentFixture<GameTurnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTurnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
