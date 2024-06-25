import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFilterComponent } from './dropdown-filter.component';

xdescribe('DropdownFilterComponent', () => {
  let component: DropdownFilterComponent;
  let fixture: ComponentFixture<DropdownFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DropdownFilterComponent],
    });
    fixture = TestBed.createComponent(DropdownFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
