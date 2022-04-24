import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule, FormGroupDirective, Validators } from '@angular/forms';





@Component({
  selector: 'lc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  
  SignUpForm: FormGroup = new FormGroup({
    surname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required),
    pasport: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    pasportDate: new FormControl('', Validators.required),
    telNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl('', Validators.required),
    organization: new FormControl('', Validators.required),
    site: new FormControl(''),
    accLink: new FormControl(''),
    location: new FormControl('', Validators.required),
  });

 

  submitForm() {
    console.log(this.SignUpForm)
  }

  constructor() { 
  }
    

  ngOnInit() {
    
  }

}
