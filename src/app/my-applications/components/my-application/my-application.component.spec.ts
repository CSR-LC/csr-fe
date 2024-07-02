import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicationComponent } from './my-application.component';

xdescribe('MyApplicationComponent', () => {
  let component: MyApplicationComponent;
  let fixture: ComponentFixture<MyApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApplicationComponent],
    });
    fixture = TestBed.createComponent(MyApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
