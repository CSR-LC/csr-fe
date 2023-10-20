import { TestBed } from '@angular/core/testing';

import { EquipmentModalService } from './equipment-modal.service';

xdescribe('EquipomentModalService', () => {
  let service: EquipmentModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
