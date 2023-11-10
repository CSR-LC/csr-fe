import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentModalComponent } from './equipment-modal.component';

xdescribe('EquipmentModalComponent', () => {
  let component: EquipmentModalComponent;
  let fixture: ComponentFixture<EquipmentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentModalComponent],
    });
    fixture = TestBed.createComponent(EquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
