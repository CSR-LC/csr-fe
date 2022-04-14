import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CatalogApi, CatalogController } from '../../services';

@Component({
  selector: 'lc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController]
})
export class CatalogComponent implements OnInit {

  constructor(
    private controller: CatalogController
  ) { }

  ngOnInit(): void {
  }

  get title() {
    return this.controller.title;
  }

  get name() {
    return this.controller.name;
  }

  get infoText() {
    return this.controller.infoText;
  }

  get imgSrc() {
    return this.controller.imgSrc;
  }

  public onCardInfo() {
    this.controller.onInfo();
  }

  public onCardOrder() {
    this.controller.onOrder();
  }
}
