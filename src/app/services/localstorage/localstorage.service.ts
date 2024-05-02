import { Injectable } from '@angular/core';
import { EncryptService } from '../encrypt/encrypt.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
userdtls:any;
  constructor(public encrypt:EncryptService,public router:Router) { }

  public setvalue(key:any,value:any)
  {
    localStorage.setItem(key,value);
  }

  public getvalue(key:any):any
  {
    return localStorage.getItem(key);
  }

  public getUserdata(key:any):any
  {
    try
    {
      this.userdtls=localStorage.getItem("userdata");
      return this.encrypt.get(JSON.parse(this.userdtls)[key]);
    }
    catch(error)
    {
      this.router.navigate(['login']);
      return error;
    }
  }

  public getToken():any
  {
    try
    {
      this.userdtls=localStorage.getItem("userdata");
      return JSON.parse(this.userdtls)["token"];
    }
    catch(error)
    {
      this.router.navigate(['login']);
      return error;
    }
  }

  public removeUser():any {
    try {
      localStorage.clear()
      this.router.navigate(['login'])
    } catch (error) {
      this.router.navigate(['login']);
      return error;
    }
  }

}
