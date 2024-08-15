import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicationsComponent } from './my-applications.component';

xdescribe('MyApplicationsComponent', () => {
  let component: MyApplicationsComponent;
  let fixture: ComponentFixture<MyApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApplicationsComponent],
    });
    fixture = TestBed.createComponent(MyApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
