import { TestBed } from '@angular/core/testing';

import { CounterArrayService } from './counter-array.service';

describe('CounterArrayService', () => {
  let service: CounterArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
