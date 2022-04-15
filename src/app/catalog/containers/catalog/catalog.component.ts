import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../models/equipment';
import { CatalogController } from '../../services';

@Component({
  selector: 'lc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CatalogComponent implements OnInit {
  public catalog$ = this.controller.catalog$;
  
  constructor(private controller: CatalogController) {

  }

  ngOnInit(): void {
    this.controller.getCatalog();
  }

  public onCardInfo() {
    this.controller.onInfo();
  }

  public onCardOrder() {
    this.controller.onOrder();
  }
}
