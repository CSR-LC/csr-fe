import { TestBed } from '@angular/core/testing';

import { RolesController } from '@app/admin/services';

xdescribe('RoleController', () => {
  let service: RolesController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
