import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUiComponent } from './block-ui.component';

xdescribe('BlockUiComponent', () => {
  let component: BlockUiComponent;
  let fixture: ComponentFixture<BlockUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockUiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
