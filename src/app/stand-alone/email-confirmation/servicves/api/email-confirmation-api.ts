import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EmailConfirmationApi {
  private readonly http = inject(HttpClient);

  confirmMail(token: string): Observable<unknown> {
    return this.http.get(`/registration_confirm/${token}`);
  }

  resendConfirmationLetter(login: string): Observable<string> {
    const body = {
      data: {
        login,
      },
    };

    return this.http.post<string>('/registration_confirm/', body);
  }
}
