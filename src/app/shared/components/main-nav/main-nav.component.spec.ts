import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainNavComponent } from './main-nav.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { BlockUiStubComponent, MainHeaderStubComponent } from '@app/tests/shared/components';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

const titleValue = 'test title value';
const pageTitle$ = of(titleValue);

function mockMainPageHeaderService() {
  return jasmine.createSpyObj('MainPageHeaderService', {
    getPageTitle: pageTitle$,
  });
}

function mockStore() {
  return jasmine.createSpyObj('Store', ['selectSnapshot']);
}

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  let store: jasmine.SpyObj<Store>;
  let mainPageHeaderService: jasmine.SpyObj<MainPageHeaderService>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [MainNavComponent, BlockUiStubComponent, MainHeaderStubComponent],
      providers: [
        {
          provide: MainPageHeaderService,
          useValue: mockMainPageHeaderService(),
        },
        {
          provide: Store,
          useValue: mockStore(),
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as typeof store;
    mainPageHeaderService = TestBed.inject(MainPageHeaderService) as typeof mainPageHeaderService;
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
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
