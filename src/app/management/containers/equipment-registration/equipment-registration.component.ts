import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Observable } from 'rxjs';

import {BaseKind, EquipmentKind, EquipmentManagement, PetSize} from '../../models/management';
import { ControllerService } from '../../services/controller/controller.service';

@Component({
  selector: 'lc-equipment',
  templateUrl: './equipment-registration.component.html',
  styleUrls: ['./equipment-registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ControllerService],
})
export class EquipmentRegistrationComponent implements OnInit, OnDestroy {
  equipmentKinds$: Observable<EquipmentKind[]> = this.getEquipmentKinds();
  petKinds$: Observable<BaseKind[]> = this.getPetKinds();
  petSize$: Observable<PetSize[]> = this.getPetSize();

  isFormSubmitted = false;

  equipmentRegistrationForm = this.formBuilder.group({
    name: [ 'Клетка для кошек', Validators.required ],
    title: [ 'Клетка', [ Validators.required, Validators.maxLength(49) ]],
    nameSubstring: [ 'Клетка для кошек' ],
    description: [ '76*53*61', Validators.required ],
    category: [ -1, Validators.min(0) ],
    subCategory: [ -1, Validators.min(0) ],
    compensationCost: [1234, [ Validators.required, Validators.max(999999999) ]],
    condition: [ 'удовлетворительное, местами облупляется краска', Validators.maxLength(999) ],
    inventoryNumber: [6543, [ Validators.required, Validators.maxLength(49) ]],
    supplier: [ 'ИП Григорьев Виталий Васильевич', [ Validators.required, Validators.maxLength(49) ]],
    receiptDate: [ '', Validators.required ],
    termsOfUse: [ 'https://google.com', [ Validators.required, Validators.maxLength(249) ]],
    maximumAmount:  [2, [ Validators.required, Validators.min(1) ]],
    maximumDays: [ 12, [ Validators.required, Validators.min(1) ]],
    petSize: [ null, Validators.required ],
    petKinds: [ null, Validators.required ],
    photoID: [ null, Validators.required ],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly controller: ControllerService
  ) {}

  ngOnInit() {
    this.setSubcategoryDisabledState();
    this.equipmentRegistrationForm.valueChanges.subscribe(val => console.log(val));
  }

  ngOnDestroy() {
    this.equipmentRegistrationForm.reset();
  }

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
    console.log(typeof this.equipmentRegistrationForm.get('photoID')?.value)

    if (!this.file) return;

    this.controller.uploadPhoto(this.file).subscribe(res => console.log(res))

    // this.isFormSubmitted = true;
    //
    // // if (!this.equipmentRegistrationForm.valid) return;
    //
    // const formValue = this.equipmentRegistrationForm.value;
    // const equipment: EquipmentManagement = {
    //   category: formValue.category,
    //   compensationСost: formValue.compensationCost,
    //   condition: formValue.condition,
    //   description: formValue.description,
    //   inventoryNumber: formValue.inventoryNumber,
    //   kind: 1,
    //   location: 71,
    //   maximumAmount: formValue.maximumAmount,
    //   maximumDays: formValue.maximumDays,
    //   name: formValue.name,
    //   nameSubstring: formValue.nameSubstring,
    //   order: 1,
    //   petKinds: formValue.petKinds,
    //   petSize: Number(formValue.petSize),
    //   // photoID: this.file,
    //   photoID: '-',
    //   receiptDate: formValue.receiptDate.toString(),
    //   status: 1,
    //   supplier: formValue.supplier,
    //   title:formValue.title,
    //   subCategory: formValue.subCategory,
    //   termsOfUse: formValue.termsOfUse,
    //   photo: '-',
    // };
    // const anuther = {
    //   "category": "Клетки",
    //   "compensationСost": 3900,
    //   "condition": "удовлетворительное, местами облупляется краска",
    //   "description": "This is a dog harness.\nWARNING: do not put on cats!",
    //   "inventoryNumber": 1,
    //   "kind": 1,
    //   "location": 71,
    //   "maximumAmount": 3,
    //   "maximumDays": 30,
    //   "name": "Dog harness 3000",
    //   "nameSubstring": "box",
    //   "order": 1,
    //   "petKinds": [
    //     0
    //   ],
    //   "petSize": 1,
    //   "photoID": "",
    //   "receiptDate": "2018",
    //   "status": 1,
    //   "supplier": "ИП Григорьев Виталий Васильевич",
    //   "title": "клетка midwest icrate 1"
    // }
    // console.log(equipment);
    // this.controller.registerEquipment(equipment);
  }

  private file?: File;

  addPhoto(event: Event) {
    let target = event.target as HTMLInputElement;
    this.file = target?.files?.length
      ? target.files[0]
      : undefined;

    console.log(this.file);

    // const reader = new FileReader();
    //
    // reader.onloadend = () => {
    //   this.file = reader.result as string;
    // };
    // reader.readAsDataURL(file);
    // reader.readAsBinaryString(file);
  }

  private getEquipmentKinds(): Observable<EquipmentKind[]> {
    return this.controller.getEquipmentKinds();
  }

  private getPetKinds(): Observable<BaseKind[]> {
    return this.controller.getPetKinds();
  }

  private getPetSize(): Observable<PetSize[]> {
    return this.controller.getPetSizes();
  }
}
