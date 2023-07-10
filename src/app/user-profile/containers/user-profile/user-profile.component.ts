import { Component, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@app/auth/models';
import { AuthState } from '@app/auth/store/store';
import { AuthService } from '@app/shared/services/auth-service/auth-service.service';
import { Select } from '@ngxs/store';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'lc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  @Select(AuthState.user) user$!: Observable<User>;

  constructor(private readonly authService: AuthService) {}

  public logout(): void {
    this.authService.logoutWithNavigation();
  }
}
