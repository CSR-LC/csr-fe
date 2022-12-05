import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseKind, EquipmentKind, PetSize } from '../../models/management';

import { ApiService } from '../api/api.service';
import { UploadPhotoResponse } from '@app/management/types';
import { BaseItemsResponse } from '@shared/types';
import { EquipmentSubCategory } from '@app/management/types/equipment-sub-category';
import { Equipment } from '@app/catalog/models/equipment';
import { NewEquipment } from '@app/management/models/equipment';
import { ValidationService } from '@shared/services/validation/validation.service';
import { FormGroup } from '@angular/forms';
import { BlockUiService } from '@shared/services/block-ui/block-ui.service';

@Injectable()
export class ControllerService {
  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
    private readonly validationService: ValidationService,
    private readonly blockUiService: BlockUiService,
  ) {}

  getEquipmentCategories(): Observable<BaseItemsResponse<EquipmentKind>> {
    return this.api.getEquipmentCategories();
  }

  getEquipmentSubCategoryById(id: number): Observable<EquipmentSubCategory[]> {
    return this.api.getEquipmentSubCategoryById(id);
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

  registerEquipment(equipment: NewEquipment): Observable<Equipment> {
    return this.api.registerEquipment(equipment);
  }

  uploadPhoto(file: File): Observable<UploadPhotoResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.api.uploadPhoto(formData);
  }

  getEquipmentStatuses(): Observable<BaseKind[]> {
    return this.api.getEquipmentStatuses();
  }

  validateForm(form: FormGroup) {
    this.validationService.validateForm(form);
  }

  manageBlockUi(isBlocked: boolean) {
    if (isBlocked) {
      return this.blockUiService.block();
    }
    this.blockUiService.unBlock();
  }
}
