import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModalComponent } from './filter-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material.module';

describe('FilterModalComponent', () => {
  let component: FilterModalComponent;
  let fixture: ComponentFixture<FilterModalComponent>;
  const dummyEquipmentFilterModalData = { equipmentFilterForm: { model: {} }, petKinds: [], petSizes: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterModalComponent],
      imports: [MaterialModule, ReactiveFormsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: dummyEquipmentFilterModalData,
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
