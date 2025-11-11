import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCtrElementsComponent } from './game-ctr-elements.component';

describe('GameCtrElementsComponent', () => {
  let component: GameCtrElementsComponent;
  let fixture: ComponentFixture<GameCtrElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCtrElementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCtrElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
