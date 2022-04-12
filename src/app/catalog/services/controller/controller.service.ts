import { Injectable } from '@angular/core';
import { CatalogApi } from '..';

@Injectable()
export class ControllerService {

  public title = "Каталог оборудования";

  public name = 'Кошколовка';
  public infoText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aspernatur error harum in molestiae necessitatibus similique
                      sit temporibus tenetur ullam veniam.`;
  public imgSrc = './assets/img/test-img.jpg';


  constructor(
    private api: CatalogApi
  ) { }

  public onOrder() {
    this.api.order();
  }

  public onInfo() {
    this.api.info();
  }
}
