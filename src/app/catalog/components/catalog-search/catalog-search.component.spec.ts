import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSearchComponent } from '@app/catalog/components';

describe('CatalogSearchComponent', () => {
  let component: CatalogSearchComponent;
  let fixture: ComponentFixture<CatalogSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*   it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
