import { TestBed } from '@angular/core/testing';

import { CatalogFilterService } from './catalog-filter.service';
import { MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

function mockStore() {
  return jasmine.createSpyObj('Store', ['selectSnapshot']);
}

describe('CatalogFilterService', () => {
  let service: CatalogFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [
        {
          provide: Store,
          useValue: mockStore(),
        },
      ],
    });
    service = TestBed.inject(CatalogFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
