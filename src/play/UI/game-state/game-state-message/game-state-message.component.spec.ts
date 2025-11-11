import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStateMessageComponent } from './game-state-message.component';

describe('GameStateMessageComponent', () => {
  let component: GameStateMessageComponent;
  let fixture: ComponentFixture<GameStateMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStateMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
