import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthState } from '@app/auth/store';
import { navLinksMap } from '@app/shared/constants/nav-menu-role-mapping';
import { UserRole } from '@app/shared/constants/user-role.enum';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { NavigationLink } from '@app/shared/types/navigation-link';
import { Store } from '@ngxs/store';

@Component({
  selector: 'lc-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent implements OnInit {
  links: NavigationLink[] = [];
  title = this.mainPageHeaderService.getPageTitle();

  constructor(private readonly mainPageHeaderService: MainPageHeaderService, private readonly store: Store) {}

  ngOnInit(): void {
    this.links = <NavigationLink[]>(
      navLinksMap.get(this.store.selectSnapshot(AuthState.user)?.role.slug ?? UserRole.default)
    );
  }
}
