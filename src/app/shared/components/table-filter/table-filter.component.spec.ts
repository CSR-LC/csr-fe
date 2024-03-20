import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterComponent } from './table-filter.component';
import { Entity } from '@app/shared/models';

xdescribe('TableFilterComponent', () => {
  let component: TableFilterComponent<Entity>;
  let fixture: ComponentFixture<TableFilterComponent<Entity>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableFilterComponent],
    });
    fixture = TestBed.createComponent(TableFilterComponent<Entity>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
