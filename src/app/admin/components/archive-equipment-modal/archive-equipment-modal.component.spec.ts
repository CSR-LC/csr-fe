import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveEquipmentModalComponent } from './archive-equipment-modal.component';

xdescribe('ArchiveEquipmentModalComponent', () => {
  let component: ArchiveEquipmentModalComponent;
  let fixture: ComponentFixture<ArchiveEquipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchiveEquipmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveEquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
