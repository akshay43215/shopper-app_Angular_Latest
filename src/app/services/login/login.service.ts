import { Component, Injectable, NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }),
};
@Injectable({
  providedIn: 'root',
})

export class LoginService {
  base_url: string = environment.baseUrl2;
  constructor(private httpClient:HttpClient) { }
  public login(data:any)
  {
    return this.httpClient.post<any>(this.base_url + 'api/Employee/login', data).pipe(map(res => { return res }));
  }
}
