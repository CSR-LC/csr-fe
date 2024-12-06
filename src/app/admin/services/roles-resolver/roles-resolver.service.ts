import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ApplicationDataState, RolesAction } from '@shared/store/application-data';
import { Role } from '@app/auth/models/role';
import { ApiService } from '@app/admin/services/api/api.service';
import { Store } from '@ngxs/store';

@Injectable()
export class RolesResolverService {
  constructor(private api: ApiService, private store: Store) {}

  getRoles(): Observable<Role[]> {
    return this.api.getAllRoles().pipe(
      switchMap((roles) => this.store.dispatch(new RolesAction(roles))),
      map(() => this.store.selectSnapshot(ApplicationDataState.roles) || []),
    );
  }
}
