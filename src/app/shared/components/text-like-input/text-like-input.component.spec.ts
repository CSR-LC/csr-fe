import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLikeInputComponent } from './text-like-input.component';

describe('TextLikeInputComponent', () => {
  let component: TextLikeInputComponent;
  let fixture: ComponentFixture<TextLikeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextLikeInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLikeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
