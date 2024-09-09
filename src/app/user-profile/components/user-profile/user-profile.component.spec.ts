import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
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
      imports: [RouterTestingModule, HttpClientModule, NgxsModule.forRoot([AuthState])],
      declarations: [UserProfileComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore(),
        },
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
