import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EmailConfirmationApi {
  constructor(private readonly http: HttpClient) {}

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
