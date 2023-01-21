import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTabComponent } from './category-tab.component';

xdescribe('CategoryTabComponent', () => {
  let component: CategoryTabComponent;
  let fixture: ComponentFixture<CategoryTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
