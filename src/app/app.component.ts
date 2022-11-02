import {Component, OnInit} from '@angular/core';
import {MainPageHeaderService} from "./shared/services/main-page-header.service";
import {AuthService} from "./shared/services/auth-service/auth-service.service";

@Component({
  selector: 'lc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = this.mainPageHeaderService.getPageTitle();

  constructor(
    private readonly mainPageHeaderService: MainPageHeaderService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.checkTokens();
  }
}
