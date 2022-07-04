import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {BaseKind, EquipmentKind, EquipmentManagement, PetSize} from '../../models/management';

import { ApiService } from '../api/api.service';
import {UploadPhotoResponse} from "@app/management/types";

@Injectable()
export class ControllerService {

  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) { }

  getEquipmentKinds(): Observable<EquipmentKind[]> {
    return this.api.getEquipmentKinds();
  }

  getPetKinds(): Observable<BaseKind[]> {
    return this.api.getPetKinds();
  }

  getPetSizes(): Observable<PetSize[]> {
    return this.api.getPetSizes();
  }

  cancel() {
    this.router.navigate(['/catalog']);
  }

  registerEquipment(equipment: EquipmentManagement) {
    this.api.registerEquipment(equipment).subscribe(() => {
      this.router.navigate(['/catalog']);
      console.log("Оборудование зарегистрировано успешно");
    });
  }

  uploadPhoto(file: File): Observable<UploadPhotoResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.api.uploadPhoto(formData)
  }
}
