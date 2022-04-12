import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

 public order() {
    alert('Заказать');
 }

 public info() {
    alert('Подробнее');
 }
}
