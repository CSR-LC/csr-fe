import { Injectable } from '@angular/core';
import { BaseKind } from '../types';
import { ApiService } from '../services/api/api.service';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetKindsResolver implements Resolve<BaseKind[]> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BaseKind[]> {
    return this.api.getPetKinds();
  }
}
