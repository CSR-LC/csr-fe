import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoleModalComponent } from '@app/admin/components';

xdescribe('AssignRoleModalComponent', () => {
  let component: AssignRoleModalComponent;
  let fixture: ComponentFixture<AssignRoleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignRoleModalComponent],
    });
    fixture = TestBed.createComponent(AssignRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
