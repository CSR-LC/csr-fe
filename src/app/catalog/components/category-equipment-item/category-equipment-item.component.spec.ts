import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEquipmentItemComponent } from './category-equipment-item.component';

describe('CategoryEquipmentItemComponent', () => {
  let component: CategoryEquipmentItemComponent;
  let fixture: ComponentFixture<CategoryEquipmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryEquipmentItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEquipmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
