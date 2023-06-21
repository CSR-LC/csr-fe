import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderComponent } from './main-header.component';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

xdescribe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;
  let mainPageHeaderService: jasmine.SpyObj<MainPageHeaderService>;
  let element: DebugElement;
  const titleValue = 'test title value';
  const pageTitle$ = of(titleValue);

  function mockMainPageHeaderService() {
    return jasmine.createSpyObj('MainPageHeaderService', {
      getPageTitle: pageTitle$,
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainHeaderComponent],
      providers: [
        {
          provide: MainPageHeaderService,
          useValue: mockMainPageHeaderService(),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get page title', () => {
    expect(mainPageHeaderService.getPageTitle).toHaveBeenCalled();
  });

  it('should get page title observable', () => {
    expect(component.pageTitle$).toBe(pageTitle$);
  });

  it('should set header', () => {
    const header = element.query(By.css('lc-main-header'));

    expect(header.componentInstance.pageTitle).toBe(titleValue);
  });
});
