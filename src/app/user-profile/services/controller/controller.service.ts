import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { ActiveArea, User } from '../../models/user';
import { UserApi } from '..';
import { Observable } from 'rxjs';

@Injectable()
export class ControllerService {
  constructor(private readonly api: UserApi) {}

  cancel(form: UntypedFormGroup) {
    form.reset();
  }

  fillProfile(user: User) {
    this.api.updateUserInfo(user).subscribe(() => {});
  }

  loadActiveAreas(): Observable<ActiveArea[]> {
    return this.api.getWorkArias();
  }

  getUserInfo(): Observable<User> {
    return this.api.getUserInfo();
  }
}
