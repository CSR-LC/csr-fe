import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, take } from 'rxjs/operators';
import { ControllerService } from '@app/shared/services/controller/controller.service';
import { Dictionary, BaseKind, FilterData, FilterValue, PetSize, EquipmentFilter } from '@app/shared/types';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { ApiService } from '@app/shared/services/api/api.service';
import { DataService } from '@app/shared/services/data/data.service';
import { CategoryId } from '@app/catalog/models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  filterValue?: FilterValue;
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
    private api: ApiService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.filterValue = this.data.filterValue;
    this.getPetKinds();
    this.getPetSizes();

    this.filterGroup
      .get('petKinds')!
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value != null && typeof value === 'object') {
          this.selectedPetKinds = Object.values(value);
        }
      });

    this.filterGroup
      .get('petSize')!
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value != null && typeof value === 'object') {
          this.selectedPetKinds = Object.values(value);
        }
      });

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
      this.subscription = this.api.filterEquipment(response).subscribe((res) => {
        this.count = res.total;
        this.cd.markForCheck();
      });
    });
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

  changeSelectedValue(event: MouseEvent, chip: MatChip) {
    const size = Number((<HTMLInputElement>event.target).getAttribute('data-size'));
    const control = this.filterGroup.get(`petSize.${size}`);
    if (!control) return;
    const value = control.value;
    control.setValue(!value);
    chip.toggleSelected();
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
    // console.log(this.activatedRoute.snapshot.data['petKinds'])
    this.controller
      .getPetKinds()
      .pipe(map((res) => res.sort(this.filterItems)))
      .subscribe((res) => {
        this.petKinds = res;
        this.createPetKindsControls(res);
        this.cd.markForCheck();
      });
    this.createPetKindsControls(this.petKinds);
  }

  private getPetSizes() {
    this.controller
      .getPetSizes()
      .pipe(map((res) => res.sort(this.filterItems)))
      .subscribe((res) => {
        this.petSizes = res;
        this.createPetSizeControls(res);
        this.cd.markForCheck();
      });
    this.createPetSizeControls(this.petSizes);
  }

  private filterItems(a: { id: number }, b: { id: number }): number {
    return a.id - b.id;
  }

  resetFilter() {
    this.getPetKinds();
    this.getPetSizes();
    this.filterGroup.get('technicalIssues')?.setValue(false);
    this.filterValue = {
      petKinds: [],
      petSize: [],
      technicalIssues: false,
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
