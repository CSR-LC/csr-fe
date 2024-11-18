import { TestBed } from '@angular/core/testing';

import { CatalogFilterService } from './catalog-filter.service';
import { Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

function mockStore() {
  return jasmine.createSpyObj('Store', ['selectSnapshot']);
}

xdescribe('CatalogFilterService', () => {
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
