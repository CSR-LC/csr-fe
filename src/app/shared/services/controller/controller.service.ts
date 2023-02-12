import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { BaseKind, PetSize } from '@shared/types';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  constructor(private api: ApiService) {}

  getPetKinds(): Observable<BaseKind[]> {
    return this.api.getPetKinds();
  }

  getPetSizes(): Observable<PetSize[]> {
    return this.api.getPetSizes();
  }
}
