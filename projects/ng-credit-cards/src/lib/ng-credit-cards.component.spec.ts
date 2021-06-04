import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCreditCardsComponent } from './ng-credit-cards.component';

describe('NgCreditCardsComponent', () => {
  let component: NgCreditCardsComponent;
  let fixture: ComponentFixture<NgCreditCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgCreditCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCreditCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
