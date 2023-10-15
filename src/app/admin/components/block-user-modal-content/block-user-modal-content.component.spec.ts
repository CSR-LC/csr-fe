import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUserModalContentComponent } from './block-user-modal-content.component';

xdescribe('BlockUserModalContentComponent', () => {
  let component: BlockUserModalContentComponent;
  let fixture: ComponentFixture<BlockUserModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockUserModalContentComponent],
    });
    fixture = TestBed.createComponent(BlockUserModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
