import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { ActiveArea, User } from '../../models/user';
import { UserApi } from '..';
import { Observable } from 'rxjs';

@Injectable()
export class ControllerService {
  constructor(private readonly api: UserApi) {}

  getUserInfo(): Observable<User> {
    return this.api.getUserInfo();
  }
}
