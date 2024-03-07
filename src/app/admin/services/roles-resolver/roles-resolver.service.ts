import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { RolesAction } from '@shared/store/application-data';
import { Role } from '@app/auth/models/role';
import { ApiService } from '@app/admin/services/api/api.service';
import { Store } from '@ngxs/store';

@Injectable()
export class RolesResolverService {
  constructor(private api: ApiService, private store: Store) {}

  getRoles(): Observable<Role[]> {
    return this.api.getAllRoles().pipe(
      switchMap((roles) => this.store.dispatch(new RolesAction(roles))),
      map((store) => store.application_data?.roles),
    );
  }
}
