import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngxs/store';
import { BlockUiStubComponent } from '@tests/shared/components';

function mockStore() {
  return jasmine.createSpyObj('Store', ['dispatch']);
}

describe('AppComponent', () => {
  let store: jasmine.SpyObj<Store>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, BlockUiStubComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore(),
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as typeof store;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
