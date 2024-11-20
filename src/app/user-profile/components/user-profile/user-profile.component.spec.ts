import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthState } from '@app/auth/store';

function mockStore() {
  return jasmine.createSpyObj('Store', ['select']);
}

xdescribe('UserProfileComponent', () => {
  let store: jasmine.SpyObj<Store>;
  let fixture: ComponentFixture<UserProfileComponent>;
  let component: UserProfileComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [RouterTestingModule, NgxsModule.forRoot([AuthState])],
      providers: [
        {
          provide: Store,
          useValue: mockStore(),
        },
        provideHttpClient(withInterceptorsFromDi()),
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as typeof store;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
