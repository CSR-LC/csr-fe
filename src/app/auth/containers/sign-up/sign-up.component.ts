import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';





@Component({
  selector: 'lc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  
  SignUpForm: FormGroup = new FormGroup({
    surname: new FormControl('Ivanov'),
    name: new FormControl('Ivan'),
    patronymic: new FormControl('Ivanov'),
  });

 

  submitForm() {
    console.log(this.SignUpForm)
  }

  constructor() { 
  }
    

  ngOnInit() {
    
  }

}
