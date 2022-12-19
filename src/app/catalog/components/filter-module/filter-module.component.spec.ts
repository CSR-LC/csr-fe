import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModuleComponent } from './filter-module.component';

describe('CatalogFilterComponent', () => {
  let component: FilterModuleComponent;
  let fixture: ComponentFixture<FilterModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterModuleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
