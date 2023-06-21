import { Component, HostListener } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearLoginData } from '@app/auth/store';

@Component({
  selector: 'lc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage() {
    this.store.dispatch(new ClearLoginData());
  }

  constructor(private readonly store: Store) {}
}
