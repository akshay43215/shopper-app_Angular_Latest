import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {  catchError, map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { LocalstorageService } from "../localstorage/localstorage.service";
import { BehaviorSubject, Observable, of } from "rxjs";



@Injectable({
  providedIn: 'root',
})

export class apiService {
  base_url: string = environment.baseUrl2;

  private apiDataSubject = new BehaviorSubject<any>(null);
  apiData$ = this.apiDataSubject.asObservable();

  private _loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this._loadingSubject.asObservable();

  private _sidebarDataSubject = new BehaviorSubject<any> (null);
  sidebarData$ = this._sidebarDataSubject.asObservable();

  private _dropdownDataSubject = new BehaviorSubject<any>(null);
  dropdownData$ = this._dropdownDataSubject.asObservable();

  constructor(private httpClient:HttpClient,private localstorage:LocalstorageService) {
    // this.loading$.next(true);
    //set the loading$ to true again just before we start the HTTP call
    // this.loading$.next(true);
   }

  requestOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': this.localstorage.getToken(),
    }),
  };

  // public fetchLead_(empCode: number, sourceId?: string) {
  //   this._loadingSubject.next(true)
  //   this.httpClient.get<any>(this.base_url + `api/Agent/getleads?empcode=${empCode}&source=${sourceId ? sourceId : ''}`, this.requestOptions)
  //     .pipe(
  //       catchError((error: any, caught: Observable<any>): Observable<any> => {
  //         // this.errorMessage = error.message;
  //         console.error('There was an error!', error);
  //         return of();
  //       }))
  //     .subscribe(data => {
  //       // this.postId = data.id;
  //     })
  // }



    // All apis...🕐!

  public fetchLead(empCode:number,sourceId?:string) {
    // debugger
    this._loadingSubject.next(true)
    console.log('calling fetch lead ---⭕〽♻');

    // return     &source=${sourceId?sourceId:''}
    this.httpClient.get <any>(this.base_url + `api/Agent/getleads?empcode=${empCode}&source=${sourceId?sourceId:''}`
    ,this.requestOptions)
    // .pipe(
    //     catchError((error: any, caught: Observable<any>): Observable<any> => {
    //       // this.errorMessage = error.message;
    //     console.error('There was an error!', error);
    //     return of();
    //  }))
    .subscribe(
      (data)=> {
        debugger
        if (data.leadId != null || data != null) {
          //return
          // of();
          this.apiDataSubject.next(data)
        }

      },
      (error) => {
        console.error('There was an error!', error);
        throw error;
      },
      ()=>{
        console.log('hit fetchlead subscribe last finally..');

        this._loadingSubject.next(false)
     }

    );

  }
  // getLoading(): Observable<boolean> {
    // return this.loading$;
  // }

  // get getLoading(): Observable<boolean> {
    // return this.loading$;
  // }

  public getSideMenu(){
   // return this.httpClient.get<any>(this.base_url + 'api/Agent/othercampaign',this.requestOptions).pipe(map(res => { return res }));
    this.httpClient.get<any>(this.base_url + 'api/Agent/othercampaign',this.requestOptions)
    .subscribe(response => {
      //return res
      if (response.status == 200 ) {
        this._sidebarDataSubject.next(response)
      }
      // else {
      //   //return
      //   of()
      // }
     }

    );

  }

  public getDropdown()
  {
    // return this.httpClient.get<any>(this.base_url + 'api/Agent/dropdown',this.requestOptions).pipe(map(res => { return res }));
     this.httpClient.get<any>(this.base_url + 'api/Agent/dropdown',this.requestOptions)
        //.pipe(map(res => { return res }));
      .subscribe((response)=>{
        if (response) {
          this._dropdownDataSubject.next(response)
        }
      })
  }


  public submitFormDta(formData: any) {
      return this.httpClient.post <any> (this.base_url + `api/ConfirmData/CallConfirmation`,formData,  this.requestOptions).pipe(map(resp =>  resp))
  }
}

