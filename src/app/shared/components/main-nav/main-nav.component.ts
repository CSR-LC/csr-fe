import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { User } from '@app/auth/models';
import { AuthState } from '@app/auth/store';
import { navLinksMap } from '@app/shared/constants/nav-menu-role-mapping';
import { UserRole } from '@app/shared/constants/user-role.enum';
import { AuthService } from '@app/shared/services/auth-service/auth-service.service';
import { NavigationLink } from '@app/shared/types/navigation-link';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { Select } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { AppRoutes } from '@shared/constants/routes.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@UntilDestroy
@Component({
  selector: 'lc-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent implements OnInit {
  @Select(AuthState.isAuthenticated) isAuthenticated$!: Observable<boolean>;
  @Select(AuthState.user) user$!: Observable<User>;
  @Select(AuthState.isEmailConfirmed) isEmailConfirmed$!: Observable<boolean>;
  public userLinks: NavigationLink[] = [];
  public adminLinks: NavigationLink[] = [];
  public profileLink!: NavigationLink | undefined;
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe((user: User) => {
      const role = user?.role.name;

      this.userLinks = <NavigationLink[]>navLinksMap.get(UserRole.user);
      this.adminLinks = role && role !== UserRole.user ? <NavigationLink[]>navLinksMap.get(role) : [];
      this.profileLink = this.userLinks.find((link) => link.route === AppRoutes.Profile);
    });
  }

  public logout(): void {
    this.authService
      .openLogoutConfirmationModal()
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.authService.logout();
        this.authService.navigateToLogin();
      });
  }
}
