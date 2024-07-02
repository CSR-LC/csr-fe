import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicationDetailsComponent } from '@app/my-applications/components';

xdescribe('MyApplicationDetailsComponent', () => {
  let component: MyApplicationDetailsComponent;
  let fixture: ComponentFixture<MyApplicationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApplicationDetailsComponent],
    });
    fixture = TestBed.createComponent(MyApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
