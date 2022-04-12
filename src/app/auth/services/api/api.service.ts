import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login() {
    alert('LOGIN');
  }
}
