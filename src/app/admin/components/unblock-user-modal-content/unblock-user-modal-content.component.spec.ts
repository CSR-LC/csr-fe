import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnblockUserModalContentComponent } from './unblock-user-modal-content.component';

xdescribe('UnblockUserModalContentComponent', () => {
  let component: UnblockUserModalContentComponent;
  let fixture: ComponentFixture<UnblockUserModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnblockUserModalContentComponent],
    });
    fixture = TestBed.createComponent(UnblockUserModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
