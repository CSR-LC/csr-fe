import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModalComponent } from './filter-modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MaterialModule } from '@app/material/material.module';
import { CatalogController } from '@app/catalog/services';

function mockStore() {
  return jasmine.createSpyObj('Store', ['selectSnapshot']);
}

function mockController() {
  return jasmine.createSpyObj('CatalogController', ['filterEquipment']);
}

describe('FilterModalComponent', () => {
  let component: FilterModalComponent;
  let fixture: ComponentFixture<FilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterModalComponent],
      imports: [MaterialModule, ReactiveFormsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: Store,
          useValue: mockStore(),
        },
        {
          provide: CatalogController,
          useValue: mockController(),
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
