import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, take } from 'rxjs/operators';
import { ControllerService } from '@app/shared/services/controller/controller.service';
import { Dictionary, BaseKind, FilterData, FilterValue, PetSize, EquipmentFilter } from '@app/shared/types';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { DataService } from '@app/shared/services/data/data.service';
import { CategoryId } from '@app/catalog/models';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ApplicationDataState } from '@shared/store/application-data/store';

@UntilDestroy
@Component({
  selector: 'lc-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ControllerService],
})
export class FilterModalComponent implements OnInit, OnDestroy {
  filterGroup = this.fb.group({
    petKinds: this.fb.group({}),
    petSize: this.fb.group({}),
    technicalIssues: this.fb.control(this.data.filterValue.technicalIssues),
  });
  filterValue!: FilterValue;
  petKinds: BaseKind[] = [];
  petSizes: PetSize[] = [];
  selectedPetKinds: boolean[] = [];
  selectedPetSize: boolean[] = [];
  count: number = 0;
  routeParam!: CategoryId;
  subscription!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FilterData,
    private matDialogRef: MatDialogRef<FilterModalComponent>,
    private fb: FormBuilder,
    private controller: ControllerService,
    private cd: ChangeDetectorRef,
    private dataService: DataService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.filterValue = this.data.filterValue;
    this.getPetKinds();
    this.getPetSizes();
    this.getQuantityItems();
    this.getSelectedPetKinds();
    this.getSelectedPetSizes();
    this.selectedPetKinds = Object.values(this.filterGroup.get('petKinds')?.value);
    this.selectedPetSize = Object.values(this.filterGroup.get('petSize')?.value);
    this.cd.markForCheck();
  }

  createPetKindsControls(petKinds: BaseKind[]) {
    const petKindsGroup = this.filterGroup.get('petKinds') as FormGroup | null;
    petKinds.forEach((item) => {
      const value = this.filterValue?.petKinds.includes(item.id);
      const control = new FormControl(value);
      petKindsGroup?.setControl(String(item.id), control);
    });
  }

  createPetSizeControls(petSize: PetSize[]) {
    const petSizeGroup = this.filterGroup.get('petSize') as FormGroup | null;
    petSize.forEach((item) => {
      const value = this.filterValue?.petSize.includes(item.id);
      const control = new FormControl(value);
      petSizeGroup?.setControl(String(item.id), control);
    });
  }

  changeSelectedValue(event: MouseEvent) {
    const size = Number((<HTMLInputElement>event.target).getAttribute('data-size'));
    const control = this.filterGroup.get(`petSize.${size}`);
    if (!control) return;
    const value = control.value;
    control.setValue(!value);
    this.filterValue.petSize.push(size);
    this.cd.markForCheck();
  }

  closeModal() {
    const formValue = this.filterGroup.value;
    const response = {
      ...formValue,
      petKinds: this.getSelectedValues(formValue.petKinds),
      petSize: this.getSelectedValues(formValue.petSize),
    };
    this.matDialogRef.close(response);
  }

  private getSelectedValues(value: Dictionary<boolean>): number[] {
    return Object.keys(value)
      .filter((key) => value[key])
      .map(Number);
  }

  private getPetKinds() {
    this.store
      .select(ApplicationDataState.petKinds)
      .pipe(map((res) => res?.slice().sort(this.filterItems)))
      .subscribe((res) => {
        this.petKinds = res!;
        this.createPetKindsControls(res!);
        this.cd.markForCheck();
      });
  }

  private getPetSizes() {
    this.store
      .select(ApplicationDataState.petSizes)
      .pipe(map((res) => res?.slice().sort(this.filterItems)))
      .subscribe((res) => {
        this.petSizes = res!;
        this.createPetSizeControls(res!);
        this.cd.markForCheck();
      });
  }

  private getQuantityItems() {
    this.filterGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      this.dataService.routeParam$.pipe(take(1)).subscribe((param) => (this.routeParam = param));
      const formValue = this.filterGroup.value;
      let response: EquipmentFilter;
      response = {
        petKinds: this.getSelectedValues(formValue.petKinds),
        petSize: this.getSelectedValues(formValue.petSize),
      };
      if (formValue['technicalIssues'] === true) {
        response.technicalIssues = true;
      }
      if (this.routeParam['categoryId']) {
        response.category = +this.routeParam['categoryId'];
      }
      this.subscription = this.controller.filterEquipment(response).subscribe((res) => {
        this.count = res.total;
        this.cd.markForCheck();
      });
    });
  }

  private filterItems(a: { id: number }, b: { id: number }): number {
    return a.id - b.id;
  }

  private getSelectedPetKinds() {
    this.filterGroup
      .get('petKinds')!
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value != null && typeof value === 'object') {
          this.selectedPetKinds = Object.values(value);
        }
      });
  }

  private getSelectedPetSizes() {
    this.filterGroup
      .get('petSize')!
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value != null && typeof value === 'object') {
          this.selectedPetKinds = Object.values(value);
        }
      });
  }

  resetFilter() {
    const petKindsGroup = this.filterGroup.get('petKinds') as FormGroup;
    Object.keys(petKindsGroup.controls).forEach((key) => {
      petKindsGroup.get(key)?.patchValue(false);
    });
    const petSizesGroup = this.filterGroup.get('petSize') as FormGroup;
    Object.keys(petSizesGroup.controls).forEach((key) => {
      petSizesGroup.get(key)?.patchValue(false);
    });
    this.filterGroup.get('technicalIssues')?.setValue(false);
    this.filterValue = {
      petKinds: [],
      petSize: [],
      technicalIssues: false,
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
