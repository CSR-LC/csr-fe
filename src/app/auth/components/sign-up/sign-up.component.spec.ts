import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthController } from '@app/auth/services';
import { BlockUiService } from '@app/shared/services/block-ui/block-ui.service';
import { NotificationsService } from '@app/shared/services/notifications/notifications.service';
import { ValidationService } from '@app/shared/services/validation/validation.service';
import { of } from 'rxjs';

import { SignUpComponent } from './sign-up.component';
import { FormBuilder } from '@angular/forms';

const controllerMock = jasmine.createSpyObj('AuthController', {
  signUp: of({ id: 1, login: 'userLogin' }),
  login: of({}),
  openPersonalInfoModal: of(''),
});

const routerMock = jasmine.createSpyObj('Router', {
  navigate: Promise.resolve(true),
});

const validationServiceMock = jasmine.createSpyObj('ValidationService', {
  emitSubmit: undefined,
  compare: () => null,
});

const blockUiServiceMock = jasmine.createSpyObj('BlockUiService', ['block', 'unBlock']);

const notificationsServiceMock = jasmine.createSpyObj('NotificationsService', ['openError']);

xdescribe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        {
          provide: AuthController,
          useValue: controllerMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: ValidationService,
          useValue: validationServiceMock,
        },
        {
          provide: BlockUiService,
          useValue: blockUiServiceMock,
        },
        {
          provide: NotificationsService,
          useValue: notificationsServiceMock,
        },
        FormBuilder,
      ],
    });
    TestBed.overrideComponent(SignUpComponent, {
      set: {
        providers: [{ provide: AuthController, useValue: controllerMock }],
      },
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
