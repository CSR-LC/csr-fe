import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseItemsResponse } from '@shared/types';
import { AdminApi } from '@app/admin/services';
import { User } from '@app/auth/models';

@Injectable()
export class UserControllerService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);

  constructor(private api: AdminApi) {}

  get users$(): Observable<User[]> {
    return this.usersSubject$.asObservable();
  }

  fetchUsers() {
    return this.api.getAllUsers().pipe(tap((data: BaseItemsResponse<User>) => this.usersSubject$.next(data.items)));
  }
}
