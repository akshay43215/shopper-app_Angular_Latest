import { Component, Injectable, NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient:HttpClient) { }
  base_url: string = environment.baseUrl2;
  public getDropdown()
  {
    return this.httpClient.get<any>(this.base_url + 'api/Agent/Dropdown').pipe(map(res => { return res }));
  }
}
