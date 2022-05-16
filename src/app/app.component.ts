import {Component} from '@angular/core';
import {MainPageHeaderService} from "./shared/services/main-page-header.service";

@Component({
  selector: 'lc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = this.mainPageHeaderService.getPageTitle();

  constructor(private mainPageHeaderService: MainPageHeaderService) {}
}
