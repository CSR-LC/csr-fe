import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoleModalContentComponent } from '@app/admin/components';

xdescribe('DeleteRoleModalContentComponent', () => {
  let component: DeleteRoleModalContentComponent;
  let fixture: ComponentFixture<DeleteRoleModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRoleModalContentComponent],
    });
    fixture = TestBed.createComponent(DeleteRoleModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
