import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEquipmentComponent } from './category-equipment.component';

describe('CategoryEquipmentComponent', () => {
  let component: CategoryEquipmentComponent;
  let fixture: ComponentFixture<CategoryEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryEquipmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
