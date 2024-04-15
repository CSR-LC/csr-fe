import { TestBed } from '@angular/core/testing';

import { RolesResolverService } from '@app/admin/services';

xdescribe('RolesResolverService', () => {
  let service: RolesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
