import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillProfileComponent } from './fill-profile.component';

xdescribe('FillProfileComponent', () => {
  let component: FillProfileComponent;
  let fixture: ComponentFixture<FillProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FillProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
