import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { Store } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

function mockMainPageHeaderService() {
  return jasmine.createSpyObj('MainPageHeaderService', ['getPageTitle']);
}

function mockAuthService() {
  return jasmine.createSpyObj('AuthService', ['checkTokens']);
}

function mockStore() {
  return jasmine.createSpyObj('Store', ['dispatch']);
}

describe('AppComponent', () => {
  let store: jasmine.SpyObj<Store>;
  let mainPageHeaderService: jasmine.SpyObj<MainPageHeaderService>;
  let authService: jasmine.SpyObj<AuthService>;

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: MainPageHeaderService,
          useValue: mockMainPageHeaderService(),
        },
        {
          provide: Store,
          useValue: mockStore(),
        },
        {
          provide: AuthService,
          useValue: mockAuthService(),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(Store) as typeof store;
    authService = TestBed.inject(AuthService) as typeof authService;
    mainPageHeaderService = TestBed.inject(MainPageHeaderService) as typeof mainPageHeaderService;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should check tokens', () => {
    expect(authService.checkTokens).toHaveBeenCalled();
  });

  it('should get page title', () => {
    expect(mainPageHeaderService.getPageTitle).toHaveBeenCalled();
  });
});
