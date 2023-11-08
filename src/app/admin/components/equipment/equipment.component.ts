import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipment } from '@app/catalog/models/equipment';
import { EquipmentModalService } from '@app/admin/services/equipment-modal/equipment-modal.service';
import { BaseKind, EquipmentKind, EquipmentOptions, PetSize } from '@app/shared/models/management';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicalIssues } from '@app/shared/types/technical-issues';
import { ValidationService } from '@app/shared/services/validation/validation.service';
import { NewEquipment } from '@app/shared/models/equipment';

type Data = {
  equipment: Equipment;
  inventoryNumbers: undefined | number[];
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
  private inventoryNumbers?: number[];
  readonly formName = 'equipment_form';
  technicalIssuesOptions = [TechnicalIssues.is, TechnicalIssues.not];
  equipmentCategories: EquipmentKind[] = [];
  petKinds: BaseKind[] = [];
  petSizes: PetSize[] = [];
  modalHeader = '';
  actionButtonText = '';

  form?: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private readonly controler: EquipmentModalService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<EquipmentComponent>,
    private readonly validationService: ValidationService,
  ) {}

  ngOnInit() {
    if (this.data.equipment) {
      this.equipment = { ...this.data.equipment };
    }
    this.inventoryNumbers = this.data.inventoryNumbers;

    this.petSizes = this.controler.petSizes;
    this.petKinds = this.controler.petKinds;
    this.equipmentCategories = this.controler.categories;
    this.modalHeader = this.controler.getHeaderText(this.equipment);
    this.actionButtonText = this.controler.getActionButtonText(this.equipment);

    this.createForm(this.equipment);

    this.conditionControl = this.form?.get('condition');
    this.photoIdControl = this.form?.get('photoID');
  }

  createForm(equipment?: Equipment) {
    this.form = this.formBuilder.group({
      category: [equipment?.category || null, Validators.required],
      compensationCost: [
        this.equipment?.compensationCost || null,
        [Validators.required, Validators.max(this.maxCompensationCost)],
      ],
      condition: [
        { value: equipment?.condition || null, disabled: equipment ? this.getConditionDisableState(equipment) : true },
        Validators.maxLength(1000),
      ],
      description: [equipment?.description || '', Validators.required],
      inventoryNumber: [
        equipment?.inventoryNumber || null,
        [Validators.required, Validators.max(this.maxInventoryNumberValue)],
      ],
      // temporary is not used. there is no control on ui
      location: [1, Validators.required],
      maximumDays: [equipment?.maximumDays || null, [Validators.required, Validators.min(1)]],
      name: [equipment?.name || '', Validators.required],
      nameSubstring: [''],
      petKinds: [equipment?.petKinds || [null], Validators.required],
      petSize: [equipment?.petSize ? equipment.petSize : null, Validators.required],
      photoID: [equipment?.photoID || null, Validators.required],
      receiptDate: [equipment?.receiptDate ? new Date(equipment.receiptDate) : '', Validators.required],
      // unnecessary  remove when the changed
      status: [1, Validators.required],
      subCategory: [1],
      supplier: [equipment?.supplier || '', [Validators.required, Validators.maxLength(50)]],
      technicalIssues: [equipment ? this.getTechnicalIssuesValue(equipment) : null, [Validators.required]],
      termsOfUse: [equipment?.termsOfUse || '', [Validators.required, Validators.maxLength(249)]],
      title: [equipment?.title || '', [Validators.required, Validators.maxLength(49)]],
    });
  }

  getTechnicalIssuesValue(equipment: Equipment): TechnicalIssues {
    return equipment.technicalIssues ? TechnicalIssues.is : TechnicalIssues.not;
  }

  getConditionDisableState(equipment: Equipment): boolean {
    return equipment.technicalIssues ? false : true;
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

  returnEquipment() {
    this.validationService.emitSubmit(this.formName);

    if (!this.form?.valid) return;

    this.dialogRef.close({
      file: this.file,
      equipment: new NewEquipment(this.form.value as unknown as EquipmentOptions),
    });
  }
}
