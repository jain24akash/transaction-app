import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  apiUrl = 'http://localhost:3000';

  getAllTransactions(): Observable<any>{
    return this._http.get(`${this.apiUrl}/transactions`);
  }
}
