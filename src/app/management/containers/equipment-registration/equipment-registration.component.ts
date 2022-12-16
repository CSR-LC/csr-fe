import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';

import { BaseKind, EquipmentKind, PetSize } from '../../models/management';
import { ControllerService } from '../../services/controller/controller.service';
import { EquipmentSubCategory } from '@app/management/types/equipment-sub-category';
import { TechnicalIssues } from '@app/management/types';
import { NewEquipment } from '@app/management/models/equipment';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { NotificationError } from '@shared/constants/notification-error.enum';
import { NotificationSuccess } from '@shared/constants/notification-success.enum';

@Component({
  selector: 'lc-equipment',
  templateUrl: './equipment-registration.component.html',
  styleUrls: ['./equipment-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ControllerService],
})
export class EquipmentRegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('photoInput') photoInput?: ElementRef;

  equipmentCategories$: Observable<EquipmentKind[]> = this.getEquipmentCategories();
  petKinds$: Observable<BaseKind[]> = this.getPetKinds();
  petSize$: Observable<PetSize[]> = this.getPetSize();
  subcategoryOptions: EquipmentSubCategory[] = [];
  technicalIssuesOptions = [TechnicalIssues.is, TechnicalIssues.not];

  readonly maxInventoryNumberValue = 99999999999999999999999999999999999999999999999999;
  private file?: File;
  private subCategoryControl?: AbstractControl | null;
  private conditionControl?: AbstractControl | null;
  private photoIdControl?: AbstractControl | null;
  private readonly maxCompensationCost = 9999999999;
  private inventoryNumberControl?: AbstractControl | null;
  private inventoryNumbers: number[] = [];
  private inventoryNumbersSubscription$!: Subscription;

  isFormSubmitted = false;

  equipmentRegistrationForm = this.formBuilder.group({
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
    status: [1, Validators.required], // specify int
    supplier: ['', [Validators.required, Validators.maxLength(50)]],
    technicalIssues: [null, [Validators.required]],
    termsOfUse: ['', [Validators.required, Validators.maxLength(249)]],
    title: ['', [Validators.required, Validators.maxLength(49)]],
  });

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly controller: ControllerService,
    private readonly notificationsService: NotificationsService,
  ) {}

  ngOnInit() {
    this.subCategoryControl = this.equipmentRegistrationForm.get('subCategory');
    this.conditionControl = this.equipmentRegistrationForm.get('condition');
    this.photoIdControl = this.equipmentRegistrationForm.get('photoID');
    this.inventoryNumberControl = this.equipmentRegistrationForm.get('inventoryNumber');
    this.getEquipmentInventoryNumbers();
  }

  ngOnDestroy() {
    this.equipmentRegistrationForm.reset();
    this.inventoryNumbersSubscription$.unsubscribe();
  }

  disableKeyboardInput(event: KeyboardEvent, formFieldName: string) {
    if (event.key === 'Backspace') return;
    const formField = this.equipmentRegistrationForm.get(formFieldName);
    return !(formField?.errors && (formField.errors['maxlength'] || formField.errors['max']));
  }

  setSubcategoryDisabledState(categoryId: number) {
    this.controller.getEquipmentSubCategoryById(categoryId).subscribe((subcategories) => {
      this.setControlState(!!subcategories.length, this.subCategoryControl);
      this.subcategoryOptions = subcategories;
    });
  }

  setConditionState(value: string) {
    this.setControlState(value === TechnicalIssues.is, this.conditionControl);
  }

  onCancel() {
    this.controller.cancel();
  }

  onSubmit() {
    this.controller.validateForm(this.equipmentRegistrationForm);

    if (!this.file || !this.equipmentRegistrationForm.valid) {
      this.notificationsService.openError(NotificationError.EquipmentFormInvalid);
      return;
    }

    const newInvNumber = this.equipmentRegistrationForm.value.inventoryNumber;
    if (this.inventoryNumbers.includes(newInvNumber)) {
      this.inventoryNumberControl?.setErrors({ incorrectInventoryNumber: true });
      this.notificationsService.openError(NotificationError.InventoryNumberExistst);
      return;
    }

    this.controller.manageBlockUi(true);

    this.controller
      .uploadPhoto(this.file)
      .pipe(
        switchMap((res) => {
          const equipment = new NewEquipment(this.equipmentRegistrationForm.value);
          equipment.photoID = res.data.id;
          return this.controller.registerEquipment(equipment);
        }),
      )
      .subscribe(() => {
        this.controller.manageBlockUi(false);
        this.notificationsService.openSuccess(NotificationSuccess.EquipmentAdded);
        this.inventoryNumbers.push(newInvNumber);
      });
  }

  choosePhoto() {
    this.photoInput?.nativeElement.click();
  }

  addPhoto(event: Event) {
    let target = event.target as HTMLInputElement;
    this.file = target?.files?.length ? target.files[0] : undefined;

    if (this.file) {
      this.photoIdControl?.setValue(this.file.name);
    }
  }

  preventDefault(event: Event) {
    event.preventDefault();
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

  private getEquipmentCategories(): Observable<EquipmentKind[]> {
    return this.controller.getEquipmentCategories().pipe(map((res) => res.items));
  }

  private getPetKinds(): Observable<BaseKind[]> {
    return this.controller.getPetKinds();
  }

  private getPetSize(): Observable<PetSize[]> {
    return this.controller.getPetSizes();
  }

  private getEquipmentInventoryNumbers() {
    this.inventoryNumbersSubscription$ = this.controller
      .getAllEquipment()
      .pipe(
        map((res) => res.items.map((item) => item.inventoryNumber)),
        tap((arr) => (this.inventoryNumbers = arr)),
      )
      .subscribe();
  }
}
