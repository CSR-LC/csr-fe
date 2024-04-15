import { TestBed } from '@angular/core/testing';

import { ApplicationsControllerService } from './applications-controller.service';

xdescribe('ApplicationsControllerService', () => {
  let service: ApplicationsControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
