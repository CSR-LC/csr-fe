import { TestBed } from '@angular/core/testing';

import { PetKindsResolver } from './pet-kinds.resolver';

describe('PetKindsResolver', () => {
  let resolver: PetKindsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PetKindsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
