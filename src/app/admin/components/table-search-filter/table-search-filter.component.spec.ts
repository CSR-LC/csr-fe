import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearchFilterComponent } from './table-search-filter.component';

xdescribe('TableSearchFilterComponent', () => {
  let component: TableSearchFilterComponent;
  let fixture: ComponentFixture<TableSearchFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSearchFilterComponent],
    });
    fixture = TestBed.createComponent(TableSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
