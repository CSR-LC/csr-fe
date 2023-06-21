import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainNavComponent } from './main-nav.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { AuthState } from '@app/auth/store';
import { ngxsConfig } from '@app/ngxs.config';

function mockStore() {
  return jasmine.createSpyObj('Store', ['select']);
}

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
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
        NgxsModule.forRoot([AuthState], ngxsConfig),
      ],
      declarations: [MainNavComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  // it('should compile', () => {
  //   expect(component).toBeTruthy();
  // });
});
