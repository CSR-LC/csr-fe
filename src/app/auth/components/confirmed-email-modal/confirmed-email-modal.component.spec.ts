import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedEmailModalComponent } from './confirmed-email-modal.component';

xdescribe('ConfirmedEmailModalComponent', () => {
  let component: ConfirmedEmailModalComponent;
  let fixture: ComponentFixture<ConfirmedEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmedEmailModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
