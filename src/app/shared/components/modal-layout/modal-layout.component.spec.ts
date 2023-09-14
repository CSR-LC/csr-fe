import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLayoutComponent } from './modal-layout.component';

xdescribe('ModalLayoutComponent', () => {
  let component: ModalLayoutComponent;
  let fixture: ComponentFixture<ModalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
