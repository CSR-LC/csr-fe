import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFilterComponent } from './catalog-filter.component';

describe('CatalogFilterComponent', () => {
  let component: CatalogFilterComponent;
  let fixture: ComponentFixture<CatalogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogFilterComponent ]
    })
    .compileComponents();
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
