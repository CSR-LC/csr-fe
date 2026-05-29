import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { NoteComponent } from './note.component';
import { NotificationTypes } from '@shared/constants/notification.enum';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, NoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct type class', () => {
    component.type = NotificationTypes.Warning;
    fixture.detectChanges();
    const noteElement = fixture.debugElement.query(By.css(`.note--${component.type}`));
    expect(noteElement).toBeTruthy();
  });

  it('should display the correct icon based on the type', () => {
    component.type = NotificationTypes.Warning;
    fixture.detectChanges();
    const iconElement = fixture.debugElement.query(By.css(`.note__icon--${component.type}`));
    expect(iconElement.nativeElement.textContent.trim()).toBe(component.type);
  });
});
