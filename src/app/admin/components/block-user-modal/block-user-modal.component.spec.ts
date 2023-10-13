import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUserModalComponent } from './block-user-modal.component';

xdescribe('BlockUserModalComponent', () => {
  let component: BlockUserModalComponent;
  let fixture: ComponentFixture<BlockUserModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockUserModalComponent],
    });
    fixture = TestBed.createComponent(BlockUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
