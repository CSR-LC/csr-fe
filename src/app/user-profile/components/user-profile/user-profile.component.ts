import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { User } from '@app/auth/models';
import { AuthState } from '@app/auth/store/store';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EmailConfirmationController } from '@app/stand-alone/email-confirmation/servicves/controller/email-confirmation-controller';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmailConfirmationApi } from '@app/stand-alone/email-confirmation/servicves/api/email-confirmation-api';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'lc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EmailConfirmationController, EmailConfirmationApi],
  imports: [SharedModule, CommonModule],
  standalone: true,
})
export class UserProfileComponent {
  @Select(AuthState.user) user$!: Observable<User>;
  private destroyRef = inject(DestroyRef);

  constructor(private readonly authService: AuthService, private readonly controller: EmailConfirmationController) {}

  public logout(): void {
    this.authService.logout();
    this.authService.navigateToLogin();
  }

  public editUserDetails(user: User) {
    const { name, phone_number, surname } = user;
    this.controller
      .openPersonalInfoModal({ name, surname, phone_number })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public changeEmail(email: string) {
    this.controller.changeEmail(email).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  deleteProfile() {
    this.controller.deleteUserProfile().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}