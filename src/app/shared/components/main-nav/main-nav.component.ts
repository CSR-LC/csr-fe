import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/auth/models';
import { AuthState, Logout } from '@app/auth/store';
import { navLinksMap } from '@app/shared/constants/nav-menu-role-mapping';
import { AppRoutes } from '@app/shared/constants/routes.enum';
import { UserRole } from '@app/shared/constants/user-role.enum';
import { AuthService } from '@app/shared/services/auth-service/auth-service.service';
import { BlockUiService } from '@app/shared/services/block-ui/block-ui.service';
import { NavigationLink } from '@app/shared/types/navigation-link';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { Select } from '@ngxs/store';
import { Observable, finalize, take } from 'rxjs';

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
  public links: NavigationLink[] = [];
  public roleLinks: NavigationLink[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly blockUiService: BlockUiService,
  ) {}

  public ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe((user: User) => {
      const role = user?.role.name;

      this.links = <NavigationLink[]>navLinksMap.get(UserRole.user);
      this.roleLinks = role && role !== UserRole.user ? <NavigationLink[]>navLinksMap.get(role) : [];
    });
  }

  public logout(): void {
    this.blockUiService.block();
    this.authService
      .logout()
      .pipe(
        take(1),
        finalize(() => this.blockUiService.unBlock()),
      )
      .subscribe(() => this.router.navigate([AppRoutes.Auth]));
  }
}
