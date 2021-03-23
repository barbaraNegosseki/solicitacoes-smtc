import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  myMethod(){
    return this.http.get('https://agdo-server.appspot.com/solicitacoes')
  }
}
