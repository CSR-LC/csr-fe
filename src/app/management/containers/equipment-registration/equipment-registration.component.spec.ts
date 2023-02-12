import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../services/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EquipmentRegistrationComponent } from './equipment-registration.component';

xdescribe('EquipmentRegistrationComponent', () => {
  let component: EquipmentRegistrationComponent;
  let fixture: ComponentFixture<EquipmentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [EquipmentRegistrationComponent],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
