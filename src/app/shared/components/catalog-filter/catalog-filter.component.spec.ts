import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFilterComponent } from './catalog-filter.component';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';
import { of } from 'rxjs';

describe('CatalogFilterComponent', () => {
  let component: CatalogFilterComponent;
  let fixture: ComponentFixture<CatalogFilterComponent>;

  const catalogFilterServiceMock = jasmine.createSpyObj('CatalogFilterService', { getFiltersButtonToggled: of(true) });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogFilterComponent],
      providers: [{ provide: CatalogFilterService, useValue: catalogFilterServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
