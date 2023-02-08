// import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { MatChip } from '@angular/material/chips';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { map } from 'rxjs/operators';
// import { BaseKind, FilterData, FilterValue, PetSize } from '@app/catalog/models/filter';
// import { ControllerService } from '../../services/controller/controller.service';
// import { Dictionary } from '@app/shared/types';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'lc-filter-modal',
//   templateUrl: './filter-modal.component.html',
//   styleUrls: ['./filter-modal.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   providers: [ControllerService],
// })
// export class FilterModalComponent implements OnInit {
//   filterGroup = this.fb.group({
//     petKinds: this.fb.group({}),
//     petSize: this.fb.group({}),
//     technicalIssues: this.fb.control(this.data.filterValue.technicalIssues),
//   });
//   filterValue?: FilterValue;
//   petKinds: BaseKind[] = [];
//   petSizes: PetSize[] = [];
//   selectedPetKinds: boolean[] = [];
//   selectedPetSize: boolean[] = [];
//   private petKindesSubscription!: Subscription;
//   private petSizeSubscription!: Subscription;

//   // catalog$ = this.controller.catalog$;
//   count:number = 0;
//   // response:any;

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: FilterData,
//     private matDialogRef: MatDialogRef<FilterModalComponent>,
//     private fb: FormBuilder,
//     private controller: ControllerService,
//     private cd: ChangeDetectorRef,
//   ) {}

//   ngOnInit(): void {
//     this.filterValue = this.data.filterValue;
//     this.getPetKinds();
//     this.getPetSizes();

//     this.petKindesSubscription = this.filterGroup.get('petKinds')!.valueChanges.subscribe((value) => {
//       this.selectedPetKinds = Object.values(value);
//     });
//     this.petSizeSubscription = this.filterGroup.get('petSize')!.valueChanges.subscribe((value) => {
//       this.selectedPetSize = Object.values(value);
//     });

//     // this.filterGroup.valueChanges.subscribe((value)=>{
//     //   const formValue = this.filterGroup.value;
//     //   if (formValue['technicalIssues'] === true) {
//     //   this.response = {
//     //     ...formValue,
//     //     petKinds: this.getSelectedValues(formValue.petKinds),
//     //     petSize: this.getSelectedValues(formValue.petSize),
//     //   };}
//     //   else {
//     //     this.response = {
//     //       petKinds: this.getSelectedValues(formValue.petKinds),
//     //       petSize: this.getSelectedValues(formValue.petSize),
//     //     };
//     //   }
//     //   this.catalog$ = this.controller.filterEquipmentCount(this.response)
//     //   this.catalog$.subscribe((res=>{
//     //     this.count = res.length}))
//     // })
//     this.cd.markForCheck();
//   }

//   createPetKindsControls(petKinds: BaseKind[]) {
//     const petKindsGroup = this.filterGroup.get('petKinds') as FormGroup | null ;
//     petKinds.forEach((item) => {
//       const value = this.filterValue?.petKinds.includes(item.id);
//       const control = new FormControl(value);
//       petKindsGroup?.setControl(String(item.id), control);
//     });
//   }

//   createPetSizeControls(petSize: PetSize[]) {
//     const petSizeGroup = this.filterGroup.get('petSize') as FormGroup | null;
//     petSize.forEach((item) => {
//       const value = this.filterValue?.petSize.includes(item.id);
//       const control = new FormControl(value);
//       petSizeGroup?.setControl(String(item.id), control);
//     });
//   }

//   changeSelectedValue(event: MouseEvent, chip: MatChip) {
//     const size = Number((<HTMLInputElement>event.target).getAttribute('data-size'));
//     const control = this.filterGroup.get(`petSize.${size}`);
//     if (!control) return;
//     const value = control.value;
//     control.setValue(!value);
//     chip.toggleSelected();
//   }

//   closeModal() {
//     const formValue = this.filterGroup.value;
//     const response = {
//       ...formValue,
//       petKinds: this.getSelectedValues(formValue.petKinds),
//       petSize: this.getSelectedValues(formValue.petSize),
//     };
//     this.matDialogRef.close(response);
//   }

//   private getSelectedValues(value: Dictionary<boolean>): number[] {
//     return Object.keys(value)
//       .filter((key) => value[key])
//       .map(Number);
//   }

//   private getPetKinds() {
//     this.controller
//       .getPetKinds()
//       .pipe(map((res) => res.sort(this.filterItems)))
//       .subscribe((res) => {
//         this.petKinds = res;
//         this.createPetKindsControls(res);
//         this.cd.markForCheck();
//       });
//     this.createPetKindsControls(this.petKinds);
//   }

//   private getPetSizes() {
//     this.controller
//       .getPetSizes()
//       .pipe(map((res) => res.sort(this.filterItems)))
//       .subscribe((res) => {
//         this.petSizes = res;
//         this.createPetSizeControls(res);
//         this.cd.markForCheck();
//       });
//     this.createPetSizeControls(this.petSizes);
//   }

//   private filterItems(a: { id: number }, b: { id: number }): number {
//     return a.id - b.id;
//   }

//   resetFilter() {
//     this.getPetKinds();
//     this.getPetSizes();
//     this.filterGroup.get('technicalIssues')?.setValue(false);
//     this.filterValue = {
//       petKinds: [],
//       petSize: [],
//       technicalIssues: false,
//     };
//   }
  
//   ngOnDestroy() {
//     this.petKindesSubscription.unsubscribe();
//     this.petSizeSubscription.unsubscribe();
//   }
// }
