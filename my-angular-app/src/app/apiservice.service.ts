import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  apiUrl = '';

  getAllTransactions(): Observable<any>{
    return this._http.get(`${this.apiUrl}/transactions`);
  }

  createWallet(data:any): Observable<any>{
    return this._http.post(`${this.apiUrl}/setup`, data)
  }

  getAllWallets(): Observable<any>{
    return this._http.get(`${this.apiUrl}/wallet`)
  }

  createTransaction(data:any, walletId:any): Observable<any>{
    return this._http.post(`${this.apiUrl}/transact/${walletId}`, data)
  }
}
