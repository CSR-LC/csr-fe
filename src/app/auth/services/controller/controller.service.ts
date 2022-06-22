import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from "./../api/api.service";

@Injectable()
export class ControllerService {

  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) { }

  cancel() {
    this.router.navigate(['/auth/login']);
  }

  signUp(email: string) {
    this.api.signUp({email: email}).subscribe((user) => {
      console.log(`Уважаемый пользователь! Благодарим за регистрацию! Данные учетной записи отправлены на адрес электронной почты ${user.email}`)
    });
  }

  login() {
    this.api.login();
  }
}
