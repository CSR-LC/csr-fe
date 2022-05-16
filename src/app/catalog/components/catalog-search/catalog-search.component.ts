import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {CatalogController} from "../../services";

@Component({
  selector: 'lc-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.less']
})
export class CatalogSearchComponent implements OnInit {

  constructor(private controller: CatalogController) { }

  ngOnInit(): void {
  }

  @Output('onSearch') onSearchEmit = new EventEmitter();

  onSearch(term: string) {
    this.onSearchEmit.emit(term);
  }
}
