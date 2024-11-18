import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { BaseKind, PetSize } from '@app/shared/models/management';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { ApplicationDataState, PetKindsAction, PetSizesAction } from '@shared/store/application-data';

@Injectable({
  providedIn: 'root',
})
export class ApplicationResolverService {
  constructor(private readonly http: HttpClient, private readonly store: Store) {}

  resolvePetKinds(): Observable<BaseKind[]> {
    return this.getPetKinds().pipe(
      switchMap((res) => this.store.dispatch(new PetKindsAction(res))),
      map(() => this.store.selectSnapshot(ApplicationDataState.petKinds) || []),
    );
  }

  resolvePetSizes(): Observable<PetSize[]> {
    return this.getPetSizes().pipe(
      switchMap((res) => this.store.dispatch(new PetSizesAction(res))),
      map(() => this.store.selectSnapshot(ApplicationDataState.petSizes) || []),
    );
  }

  private getPetKinds(): Observable<BaseKind[]> {
    return this.http.get<BaseKind[]>('pet_kind');
  }

  private getPetSizes(): Observable<PetSize[]> {
    return this.http.get<PetSize[]>('pet_size');
  }
}
