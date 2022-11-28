import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActiveArea, User } from '../../models/user';
import { Observable, of } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public updateUserInfo(user: User): Observable<User> {
    // TODO: uncomment http request once BE implements the logic
    return of(user);
    // return this.httpClient.post<User>('', user);
  }

  public getWorkArias(): Observable<ActiveArea[]> {
    return this.httpClient.get<ActiveArea[]>('/api/v1/active_areas');
  }
}
