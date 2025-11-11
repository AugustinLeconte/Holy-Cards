import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTerrainComponent } from './game-terrain.component';

describe('GameTerrainComponent', () => {
  let component: GameTerrainComponent;
  let fixture: ComponentFixture<GameTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTerrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
