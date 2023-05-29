import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockEquipmentModalComponent } from './block-equipment-modal.component';

xdescribe('BlockEquipmentModal.Component', () => {
  let component: BlockEquipmentModalComponent;
  let fixture: ComponentFixture<BlockEquipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockEquipmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockEquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
