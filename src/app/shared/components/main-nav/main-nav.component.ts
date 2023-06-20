import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@app/auth/models';
import { AuthState, Logout } from '@app/auth/store';
import { navLinksMap } from '@app/shared/constants/nav-menu-role-mapping';
import { UserRole } from '@app/shared/constants/user-role.enum';
import { NavigationLink } from '@app/shared/types/navigation-link';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

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

  public ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe((user: User) => {
      this.links = <NavigationLink[]>navLinksMap.get(user?.role.name ?? UserRole.user);
    });
  }
}
