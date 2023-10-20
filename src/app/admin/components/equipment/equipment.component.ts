import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipment } from '@app/catalog/models/equipment';
import { EquipmentModal } from '@app/admin/constants/equipment-modal.enum';
import { Store } from '@ngxs/store';
import { EquipmentModalService } from '@app/admin/services/equipment-modal/equipment-modal.service';
import { BaseKind, EquipmentKind, PetSize } from '@app/management/models/management';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TechnicalIssues } from '@app/management/types';

type Data = {
  equipment: Equipment;
};

@Component({
  selector: 'lc-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
  providers: [EquipmentModalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentComponent implements OnInit {
  @ViewChild('photoInput') photoInput?: ElementRef;
  private equipment?: Equipment;
  readonly maxInventoryNumberValue = 99999999999999999999999999999999999999999999999999;
  private readonly maxCompensationCost = 9999999999;
  private conditionControl?: AbstractControl | null;
  private photoIdControl?: AbstractControl | null;
  private file?: File;
  technicalIssuesOptions = [TechnicalIssues.is, TechnicalIssues.not];
  equipmentCategories: EquipmentKind[] = [];
  petKinds: BaseKind[] = [];
  petSizes: PetSize[] = [];
  modalHeader = '';
  actionButtonText = '';

  form = this.formBuilder.group({
    category: [null, Validators.required],
    subCategory: [{ value: null, disabled: true }, Validators.min(0)],
    compensationCost: [null, [Validators.required, Validators.max(this.maxCompensationCost)]],
    condition: [{ value: null, disabled: true }, Validators.maxLength(1000)],
    description: ['', Validators.required],
    inventoryNumber: [null, [Validators.required, Validators.max(this.maxInventoryNumberValue)]],
    // temporary is not used. there is no control on ui
    location: [1, Validators.required],
    maximumAmount: [null, [Validators.required, Validators.min(1)]],
    maximumDays: [null, [Validators.required, Validators.min(1)]],
    name: ['', Validators.required],
    nameSubstring: [''],
    petKinds: [[null], Validators.required],
    petSize: [null, Validators.required],
    photoID: [null, Validators.required],
    receiptDate: ['', Validators.required],
    // unnecessary  remove when the changed
    status: [1, Validators.required],
    supplier: ['', [Validators.required, Validators.maxLength(50)]],
    technicalIssues: [null, [Validators.required]],
    termsOfUse: ['', [Validators.required, Validators.maxLength(249)]],
    title: ['', [Validators.required, Validators.maxLength(49)]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private readonly controler: EquipmentModalService,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.equipment = this.data.equipment;
    this.petSizes = this.controler.petSizes;
    this.petKinds = this.controler.petKinds;
    this.equipmentCategories = this.controler.categories;
    this.modalHeader = this.controler.getHeaderText(this.equipment);
    this.actionButtonText = this.controler.getActionButtonText(this.equipment);

    // this.subCategoryControl = this.equipmentRegistrationForm.get('subCategory');
    this.conditionControl = this.form.get('condition');
    this.photoIdControl = this.form.get('photoID');
    // this.inventoryNumberControl = this.equipmentRegistrationForm.get('inventoryNumber');
  }

  setConditionState(value: string) {
    this.setControlState(value === TechnicalIssues.is, this.conditionControl);
  }

  private setControlState(enabled: boolean, control?: AbstractControl | null) {
    if (enabled) {
      control?.enable();
    } else {
      control?.disable();
      control?.setValue(null);
    }

    control?.setValidators(enabled ? Validators.required : null);
  }

  setSubcategoryDisabledState(categoryId: number) {
    // this.controller.getEquipmentSubCategoryById(categoryId).subscribe((subcategories) => {
    //   this.setControlState(!!subcategories.length, this.subCategoryControl);
    //   this.subcategoryOptions = subcategories;
    // });
  }

  choosePhoto() {
    this.photoInput?.nativeElement.click();
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }

  addPhoto(event: Event) {
    let target = event.target as HTMLInputElement;
    this.file = target?.files?.length ? target.files[0] : undefined;

    if (this.file) {
      this.photoIdControl?.setValue(this.file.name);
    }
  }
}
