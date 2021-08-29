import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  configUrl = 'rest/public/';

  getConfig() {
    return this.http.get(this.configUrl+"style");
  }
}
