import { Component, Input } from '@angular/core';

@Component({
  selector: 'lc-main-header',
  template: '',
})
export class MainHeaderStubComponent {
  @Input() pageTitle!: string;
}
