import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingCardComponent } from './flying-card.component';

describe('FlyingCardComponent', () => {
  let component: FlyingCardComponent;
  let fixture: ComponentFixture<FlyingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
