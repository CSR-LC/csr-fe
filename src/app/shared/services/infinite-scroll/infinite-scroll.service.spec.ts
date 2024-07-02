import { TestBed } from '@angular/core/testing';

import { InfiniteScrollService } from './infinite-scroll.service';
import { Application } from '@app/admin/types';

xdescribe('InfiniteScrollService', () => {
  let service: InfiniteScrollService<Application>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfiniteScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
