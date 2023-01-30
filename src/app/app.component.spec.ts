import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { Store } from '@ngxs/store';
import { BlockUiStubComponent, MainHeaderStubComponent } from '@tests/shared/components';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

const titleValue = 'test title value';
const pageTitle$ = of(titleValue);

function mockMainPageHeaderService() {
  return jasmine.createSpyObj('MainPageHeaderService', {
    getPageTitle: pageTitle$,
  });
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
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, BlockUiStubComponent, MainHeaderStubComponent],
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
    }).compileComponents();

    store = TestBed.inject(Store) as typeof store;
    authService = TestBed.inject(AuthService) as typeof authService;
    mainPageHeaderService = TestBed.inject(MainPageHeaderService) as typeof mainPageHeaderService;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
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

  it('should get page title observable', () => {
    expect(component.title).toBe(pageTitle$);
  });

  it('should set header', () => {
    const header = element.query(By.css('lc-main-header'));

    expect(header.componentInstance.pageTitle).toBe(titleValue);
  });
});
