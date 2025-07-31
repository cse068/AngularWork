import { TestBed } from '@angular/core/testing';

import { GetUserData } from './get-user-data';

describe('GetUserData', () => {
  let service: GetUserData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
