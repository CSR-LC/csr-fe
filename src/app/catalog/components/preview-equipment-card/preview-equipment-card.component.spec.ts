import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEquipmentCardComponent } from './preview-equipment-card.component';

describe('PreviewEquipmentCardComponent', () => {
  let component: PreviewEquipmentCardComponent;
  let fixture: ComponentFixture<PreviewEquipmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewEquipmentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEquipmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
