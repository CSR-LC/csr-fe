import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { User } from '@app/auth/models';
import { AuthState } from '@app/auth/store/store';
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
export class UserProfileComponent implements OnInit {
  private readonly controller = inject(EmailConfirmationController);

  @Select(AuthState.user) user$!: Observable<User>;
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.controller.setPageTitle();
  }

  public logout(): void {
    this.controller.logout();
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
