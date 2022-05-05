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
    return this.httpClient.get<Equipment[]>("/api/equipment");
 }
}
