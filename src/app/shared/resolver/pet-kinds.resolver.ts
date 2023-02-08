import { Injectable } from '@angular/core';
import { BaseKind, PetSize } from '@app/catalog/models/filter';
import { map } from 'rxjs/operators';
// import { CatalogApi } from '../services';
import { ApiService } from '../services/api/api.service';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetKindsResolver implements Resolve<BaseKind[]> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BaseKind[]> {
  console.log("Resolver")
  return this.api.getPetKinds();
  }

  private filterItems(a: { id: number }, b: { id: number }): number {
    return a.id - b.id;
  }
}
