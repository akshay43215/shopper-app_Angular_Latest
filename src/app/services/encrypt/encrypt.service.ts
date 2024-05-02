import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  keys:string="7x!A%D*G-KaPdSgV";
  constructor() { }
  set(value:any){
    var key = CryptoJS.enc.Utf8.parse(this.keys);
    var iv = CryptoJS.enc.Utf8.parse(this.keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,

        mode: CryptoJS.mode.ECB
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(value:any){
    var key = CryptoJS.enc.Utf8.parse(this.keys);
    var iv = CryptoJS.enc.Utf8.parse(this.keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        mode: CryptoJS.mode.ECB,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
