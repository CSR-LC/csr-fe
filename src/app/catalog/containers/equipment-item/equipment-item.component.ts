import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CatalogController} from "../../services";
import {ActivatedRoute} from "@angular/router";
import {first, Observable} from "rxjs";
import {Equipment} from "../../models/equipment";
import {MainPageHeaderService} from "../../../shared/services/main-page-header.service";

@Component({
  selector: 'lc-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})


export class EquipmentItemComponent implements OnInit {
  public catalog$ = this.controller.catalog$;

  public defaultImage = "./assets/img/no-photo.png";

  equipment!: Observable<Equipment>;

  constructor(private controller: CatalogController, private route: ActivatedRoute, private mainPageHeaderService: MainPageHeaderService) { }

  ngOnInit(): void {
    this.controller.getCatalog();
    this.equipment = this.controller.getEquipmentItemInfo(this.route.snapshot.params['id']);

    this.equipment.pipe(first()).subscribe(item => this.mainPageHeaderService.setPageTitle(item.name));
  }
}
