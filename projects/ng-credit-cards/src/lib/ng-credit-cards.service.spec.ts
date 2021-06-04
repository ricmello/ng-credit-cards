import { TestBed } from '@angular/core/testing';

import { NgCreditCardsService } from './ng-credit-cards.service';

describe('NgCreditCardsService', () => {
  let service: NgCreditCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgCreditCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
