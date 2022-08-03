import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoginInformation, NewUserInfo, SignupResponse, Tokens} from "../../models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) {}

  public login(credentials: LoginInformation): Observable<Tokens> {
    return this.httpClient.post<Tokens>('/api/v1/login', credentials);
  }

  public signUp(signUpInfo: NewUserInfo): Observable<SignupResponse> {
    return this.httpClient.post<SignupResponse>('/api/v1/users', signUpInfo);
  }
}
