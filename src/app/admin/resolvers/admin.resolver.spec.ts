import { TestBed } from '@angular/core/testing';

import { AdminResolver } from './admin.resolver';

describe('AdminResolver', () => {
  let resolver: AdminResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
