import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearLoginData } from '@app/auth/store';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';

@Component({
  selector: 'lc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = this.mainPageHeaderService.getPageTitle();

  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage() {
    this.store.dispatch(new ClearLoginData());
  }

  constructor(private readonly mainPageHeaderService: MainPageHeaderService, private readonly store: Store) {}
}
