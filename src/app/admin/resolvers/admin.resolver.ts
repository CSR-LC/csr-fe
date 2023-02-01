import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../auth/services/api/api.service';
import { User } from '../../auth/models';

@Injectable()
export class AdminResolver implements Resolve<User> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    console.log('resolve user')
    return this.api.getCurrentUser();
  }
}
