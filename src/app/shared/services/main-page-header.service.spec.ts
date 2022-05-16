import { TestBed } from '@angular/core/testing';

import { MainPageHeaderService } from './main-page-header.service';

describe('MainPageHeaderService', () => {
  let service: MainPageHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
