import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Equipment } from '@app/catalog/models/equipment';
import { BaseKind, EquipmentKind, EquipmentOptions, PetSize } from '@app/shared/models/management';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicalIssues } from '@app/shared/types/technical-issues';
import { ValidationService } from '@app/shared/services/validation/validation.service';
import { NewEquipment } from '@app/shared/models/equipment';
import { EquipmentModal } from '@app/admin/constants/equipment-modal.enum';
import { ErrorOptions } from '@app/shared/types';
import { EquipmentModalData } from '@app/admin/types/equipment-modal-data';
import { maxInventoryNumber, maxInventoryNumberLength } from '@app/admin/constants/max-inventory-number';
import { maxCompensationCost } from '@app/admin/constants/max-compensation-cost';
import { EquipmentFormLabel } from '@app/admin/constants';
import { InfoModalComponent } from '@app/shared/components';

@Component({
  selector: 'lc-equipment',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentModalComponent implements OnInit {
  private data = inject<EquipmentModalData>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject<MatDialogRef<EquipmentModalComponent>>(MatDialogRef);
  private readonly validationService = inject(ValidationService);

  @ViewChild('photoInput') photoInput?: ElementRef;
  private equipment?: Equipment;
  readonly maxInventoryNumber = maxInventoryNumber;
  readonly labels = EquipmentFormLabel;
  readonly maxCompensationCost = maxCompensationCost;
  private conditionControl?: AbstractControl | null;
  private photoIdControl?: AbstractControl | null;
  private file?: File;
  private inventoryNumbers?: number[];
  readonly formName = 'equipment_form';
  private readonly inventoryNumberErrorOptions: ErrorOptions = {
    message: 'Инвентарный номер уже существует',
  };

  readonly maxValue = {
    condition: 1000,
    compensationCost: maxCompensationCost,
    compensationCostLength: String(maxCompensationCost).length,
    description: 500,
    inventoryNumber: maxInventoryNumber,
    inventoryNumberLength: maxInventoryNumberLength,
    maximumDays: 14,
    supplier: 50,
    termsOfUse: 250,
    title: 150,
    name: 150,
  };

  readonly minValue = {
    maximumDays: 1,
  };

  private readonly conditionValidators = [Validators.required, Validators.maxLength(this.maxValue.condition)];

  technicalIssuesOptions = [TechnicalIssues.is, TechnicalIssues.not];
  equipmentCategories: EquipmentKind[] = [];
  petKinds: BaseKind[] = [];
  petSizes: PetSize[] = [];
  modalHeader = '';
  actionButtonText = '';

  form?: FormGroup;

  ngOnInit() {
    this.setValues();
    this.setTexts();
    this.createForm(this.equipment);
    this.getControls();
  }

  createForm(equipment?: Equipment) {
    this.form = this.formBuilder.group({
      category: [equipment?.category || null, Validators.required],
      compensationCost: [
        this.equipment?.compensationCost || null,
        [Validators.required, Validators.max(this.maxValue.compensationCost)],
      ],
      condition: [
        { value: equipment?.condition || null, disabled: equipment ? this.getConditionDisableState(equipment) : true },
      ],
      description: [
        equipment?.description || '',
        [Validators.required, Validators.maxLength(this.maxValue.description)],
      ],
      inventoryNumber: [
        equipment?.inventoryNumber || null,
        [
          Validators.required,
          Validators.max(maxInventoryNumber),
          this.validationService.getCustomValidator(this.inventoryNumberErrorOptions, this.inventoryNumbersValidator),
        ],
      ],
      // temporary is not used. there is no control on ui
      location: [1, Validators.required],
      maximumDays: [
        equipment?.maximumDays || null,
        [Validators.required, Validators.min(this.minValue.maximumDays), Validators.max(this.maxValue.maximumDays)],
      ],
      name: [equipment?.name || '', [Validators.required, Validators.maxLength(this.maxValue.name)]],
      nameSubstring: [''],
      petKinds: [equipment?.petKinds || null, Validators.required],
      petSize: [equipment?.petSize ? equipment.petSize : null, Validators.required],
      photoID: [equipment?.photoID || null, Validators.required],
      receiptDate: [equipment?.receiptDate ? new Date(equipment.receiptDate) : '', Validators.required],
      // unnecessary  remove when the changed
      status: [1, Validators.required],
      subCategory: [1],
      supplier: [equipment?.supplier || '', [Validators.required, Validators.maxLength(this.maxValue.supplier)]],
      technicalIssues: [equipment ? this.getTechnicalIssuesValue(equipment) : null, [Validators.required]],
      termsOfUse: [equipment?.termsOfUse || '', [Validators.required, Validators.maxLength(this.maxValue.termsOfUse)]],
      title: [equipment?.title || '', [Validators.required, Validators.maxLength(this.maxValue.title)]],
    });
  }

  private readonly inventoryNumbersValidator = (inventoryNumber: number): boolean => {
    if (this.equipment && this.equipment.inventoryNumber === inventoryNumber) return true;
    if (!this.inventoryNumbers) return true;
    return !this.inventoryNumbers.includes(inventoryNumber);
  };

  private getControls() {
    this.conditionControl = this.form?.get('condition');
    this.photoIdControl = this.form?.get('photoID');
  }

  private setValues() {
    if (this.data.equipment) {
      this.equipment = { ...this.data.equipment };
    }
    this.inventoryNumbers = this.data.inventoryNumbers;

    this.petSizes = this.data.petSizes || [];
    this.petKinds = this.data.petKinds || [];
    this.equipmentCategories = this.data.categories || [];
  }

  private setTexts() {
    this.modalHeader = this.equipment ? EquipmentModal.EditEquipmentHeader : EquipmentModal.AddEquipmentHeader;
    this.actionButtonText = this.equipment ? EquipmentModal.Save : EquipmentModal.AddEquipmentModalButtonText;
  }

  getTechnicalIssuesValue(equipment: Equipment): TechnicalIssues {
    return equipment.technicalIssues ? TechnicalIssues.is : TechnicalIssues.not;
  }

  getConditionDisableState(equipment: Equipment): boolean {
    return !equipment.technicalIssues;
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

    control?.setValidators(enabled ? this.conditionValidators : null);
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

  close() {
    if (this.form?.pristine) {
      return this.dialogRef.close(false);
    }

    this.dialog
      .open(InfoModalComponent, {
        data: {
          headerText: this.closeNotificationHeader,
          infoMessage: this.closeNotificationMessage,
          buttonOkText: 'Удалить',
          buttonCancelText: 'Вернуться',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.dialogRef.close(false);
      });
  }

  get closeNotificationMessage(): string {
    return this.equipment
      ? 'Если отменить редактирование, то все изменения будут удалены.'
      : 'Если отменить регистрацию, то все внесенные данные будут удалены';
  }

  get closeNotificationHeader(): string {
    return this.equipment ? 'Изменения будут удалены.' : 'Данные будут удалены.';
  }
}
