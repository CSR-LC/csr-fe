import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { EquipmentManagement, Kind } from '../../models/management';
import { ControllerService } from '../../services/controller/controller.service';

@Component({
  selector: 'lc-equipment',
  templateUrl: './equipment-registration.component.html',
  styleUrls: ['./equipment-registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ControllerService],
})
export class EquipmentRegistrationComponent implements OnInit, OnDestroy {
  kinds$: Observable<Kind[]> = this.loadKinds();

  isFormSubmitted = false;

  constructor(private readonly controller: ControllerService) {}

  ngOnInit() {
    this.setSubcategoryDisabledState();
  }

  ngOnDestroy() {
    this.equipmentRegistrationForm.reset();
  }

  equipmentRegistrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', [Validators.required, Validators.maxLength(49)]),
    nameSubstring: new FormControl(''),
    description: new FormControl('', Validators.required),
    category: new FormControl(-1, Validators.min(0)),
    subCategory: new FormControl(-1, Validators.min(0)),
    compensationCost: new FormControl(null, [
      Validators.required,
      Validators.max(999999999),
    ]),
    condition: new FormControl('', Validators.maxLength(999)),
    inventoryNumber: new FormControl(null, [
      Validators.required,
      Validators.maxLength(49),
    ]),
    supplier: new FormControl('', [
      Validators.required,
      Validators.maxLength(49),
    ]),
    receiptDate: new FormControl('', Validators.required),
    termsOfUse: new FormControl('', [
      Validators.required,
      Validators.maxLength(249),
    ]),
    maximumAmount: new FormControl(null, [
      Validators.required,
      Validators.min(1),
    ]),
    maximumDays: new FormControl(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  disableKeyboardInput(event: KeyboardEvent, formFieldName: string) {
    if (event.key === 'Backspace') return;
    const formField = this.equipmentRegistrationForm.get(formFieldName);
    if (
      formField?.errors &&
      (formField.errors['maxlength'] || formField.errors['max'])
    ) {
      return false;
    }
    return true;
  }

  setSubcategoryDisabledState() {
    const subCategoryControl =
      this.equipmentRegistrationForm.get('subCategory');
    if (this.equipmentRegistrationForm.get('category')?.value === -1) {
      subCategoryControl?.disable();
    } else {
      subCategoryControl?.enable();
    }
  }

  onCancel() {
    this.controller.cancel();
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.equipmentRegistrationForm.valid) {
      const formValue = this.equipmentRegistrationForm.value;
      const equipment: EquipmentManagement = {
        name: formValue.name,
        title:formValue.title,
        category: formValue.category,
        subCategory: formValue.subCategory,
        description: formValue.description,
        nameSubstring: formValue.nameSubstring,
        compensationСost: formValue.compensationCost,
        condition: formValue.condition,
        inventoryNumber: formValue.inventoryNumber,
        supplier: formValue.supplier,
        receiptDate: formValue.receiptDate,
        termsOfUse: formValue.termsOfUse,
        maximumAmount: formValue.maximumAmount,
        maximumDays: formValue.maximumDays,
        kind: 1,
        location: 1,
        order: 1,
        status: 1,
        photo: '-',
      };
      this.controller.registerEquipment(equipment);
    }
  }

  private loadKinds(): Observable<Kind[]> {
    return this.controller.getKinds();
  }
}
