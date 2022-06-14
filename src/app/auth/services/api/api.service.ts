import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login() {
    alert('LOGIN');
  }

  public signUp(signUpInfo: {email: string}) {
    // TODO: uncomment http request once BE is updated to get only email as request body
    return of({
      id: 1,
      ...signUpInfo,
    })
    // return this.httpClient.post('/api/v1/users', signUpInfo);
  }
}
