import { TestBed } from '@angular/core/testing';

import { CategoriesResolver } from './categories.resolver';

xdescribe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CategoriesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
