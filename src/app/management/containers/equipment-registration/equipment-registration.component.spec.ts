import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentRegistrationComponent } from './equipment-registration.component';

describe('EquipmentRegistrationComponent', () => {
  let component: EquipmentRegistrationComponent;
  let fixture: ComponentFixture<EquipmentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
