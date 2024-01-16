import { TestBed } from '@angular/core/testing';

import { TableFilterService } from './table-filter.service';

xdescribe('TableFilterService', () => {
  let service: TableFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
