import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActiveArea, User } from '../../models/user';
import { Observable, of } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getUserInfo(): Observable<User> {
    return this.httpClient.get<User>('v1/users/me');
  }
}
