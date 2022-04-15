import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Equipment } from '../../models/equipment';

@Injectable()
export class ApiService {

  constructor(
     private httpClient: HttpClient
  ) { }

 public order() {
    alert('Заказать');
 }

 public info() {
    alert('Подробнее');
 }

 public getCatalog(): Observable<Equipment[]> {
   //  return this.httpClient.get<Equipment[]>("https://csr.golangforall.com/api/equipment");
   return of([{
      name: 'Кошколовка',
      info: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Aspernatur error harum in molestiae necessitatibus similique
      sit temporibus tenetur ullam veniam.`,
      imgSrc: './assets/img/test-img.jpg'
   }, {
      name: 'Собакаловка',
      info: '',
      imgSrc: ''
   }]);
 }
}
