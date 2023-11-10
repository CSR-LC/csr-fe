import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserModalContentComponent } from './delete-user-modal-content.component';

xdescribe('DeleteUserModalContentComponent', () => {
  let component: DeleteUserModalContentComponent;
  let fixture: ComponentFixture<DeleteUserModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserModalContentComponent],
    });
    fixture = TestBed.createComponent(DeleteUserModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
