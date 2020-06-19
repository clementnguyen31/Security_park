import { TestBed } from '@angular/core/testing';

import { EcheanciersService } from './echeanciers.service';

describe('EcheanciersService', () => {
  let service: EcheanciersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcheanciersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
