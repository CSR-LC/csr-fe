import {ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Select} from "@ngxs/store";
import {AuthState} from "@app/auth/store";
import {Observable} from "rxjs";

@Component({
  selector: 'lc-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  @Select(AuthState.isAuthenticated)
  public isAuthenticated$!: Observable<boolean>;

  @Input() pageTitle!: string;
}
