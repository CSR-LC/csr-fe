import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { rolesResolver } from './roles.resolver';
import { Role } from '@app/auth/models/role';
import { Observable } from 'rxjs';

xdescribe('rolesResolver', () => {
  const executeResolver: ResolveFn<Observable<Role[]>> = (...resolverParameters) => {
    return TestBed.runInInjectionContext(() => rolesResolver(...resolverParameters));
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
