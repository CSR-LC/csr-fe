import { TestBed } from '@angular/core/testing';

import { DateRangeService } from './date-range.service';

xdescribe('DateRangeService', () => {
  let service: DateRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
