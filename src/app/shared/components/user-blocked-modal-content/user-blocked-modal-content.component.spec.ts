import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlockedModalContentComponent } from './user-blocked-modal-content.component';

describe('UserBlockedModalContentComponent', () => {
  let component: UserBlockedModalContentComponent;
  let fixture: ComponentFixture<UserBlockedModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBlockedModalContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserBlockedModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
