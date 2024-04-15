import { TestBed } from '@angular/core/testing';

import { EquipmentController } from './equipment-controller.service';

xdescribe('ControllerService', () => {
  let service: EquipmentController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
