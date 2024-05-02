import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../services/shared/modalpopup/modal.service';
import { Subscription } from 'rxjs';
import { FormControl, ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CustomerTodayFormComponent } from '../_template-forms/customer-today-form/customer-today-form.component'
import { CustomerRedemptionFormComponent } from '../_template-forms/customer-redemption-form/customer-redemption-form.component'
import { CustomerNCAFormComponent } from '../_template-forms/customer-nca-form/customer-nca-form.component'
import { EncryptService } from '../../services/encrypt/encrypt.service';
import { apiService } from '../../services/shared/apiService.Service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { leadInterfaceType } from '../../interface/leadInterface';

// declare function sayHello(name:any):void;



export type formTypes = 'nca' | 'today' | 'redemption';
type hdnDataTypes = { leadId: String, "leadType": String, empCode: String, currMobNo: String }  // ={leadID:134, leadType:'callBack',ph:40023}
@Component({
  selector: 'app-customer-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomerTodayFormComponent, CustomerRedemptionFormComponent, CustomerNCAFormComponent],
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.css'
})

export class CustomerHeaderomponent implements OnInit, OnDestroy {
  formCheck: any = ''
  formTypeOf !: formTypes

  finalFormData!: { "call_type": formTypes, "Indata": any, "Lead_Type": hdnDataTypes }

  empCode: number;
  nowLead !: leadInterfaceType
  decryptLeadID: number | null = null
  // decryptBucketID : number
  // hiddenData!: hdnDataTypes
  // hdnObj : {leadId:Number}
  constructor(private modalService: ModalService, private fb: FormBuilder, public encrypt: EncryptService, public apiService: apiService, public localstorage: LocalstorageService) {
    this.empCode = JSON.parse(this.localstorage.getUserdata('empcode')); // first get hidden empcode
    // let hidddenVals = JSON.parse(this.localstorage.getvalue('hidden'))
    if (this.nowLead) {
      // this.decryptLeadID =
      console.log(JSON.parse(this.encrypt.get(JSON.parse(this.localstorage.getvalue('hidden')).leadId)));
    }

    // this.decryptBucketID = JSON.parse(JSON.parse(this.localstorage.getvalue('hidden').bucketId));
    //  console.log(this.decryptBucketID);

  }

  ////////////////////////////////

  ngOnInit(): void {

    this.connectToBitvoice();
    this.apiService.apiData$.subscribe(
      (data) => {
        if (data.leadName) {
          this.nowLead = data
          let { leadName } = data

          if (leadName.toLowerCase().trim() == "redemption") {
            this.formTypeOf = 'redemption'
          } else if (leadName.toLowerCase().trim() == "new customer") {
            this.formTypeOf = 'today'
          } else {
            this.formTypeOf = 'nca'
          }
        }
      }
    )
  }

//load page call-connect fn
  connectToBitvoice() {
    let api = (<any>window).bitvoiceAPI;
    api.url = 'http://10.4.2.95:10000'
    api.exten = 909;
    // all event detail have the event related
    //on each connection event
    window.addEventListener(api.APP_CONNECTED, function (e: any) { console.log(e) });
    //click2call orignation status
    window.addEventListener(api.C2CRESPONSE, function (e: any) { console.log(e) });
    //click2call end event
    window.addEventListener(api.C2CEND, function (e: any) { console.log(e) });
    //incoming call event
    window.addEventListener(api.INCOMINGCALL, function (e: any) { console.log(e) });
    //incoming call/direct call hangup event
    window.addEventListener(api.HANGUP, function (e: any) { console.log(e) });
    api.connect();
  }

//button-click call connect
  callConnet() {
    let api = (<any>window).bitvoiceAPI;
    api.callerid = 373706;
    api.makeCall("7306544148");
  }

//getters current-form
  get showNCAForm() {
    return this.formTypeOf === 'nca';
  }
  get showTodayForm() {
    return this.formTypeOf === 'today';
  }
  get showRedemptionForm() {
    return this.formTypeOf === 'redemption'
  }


  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  showMyComponent: boolean = false


  openModal() {
    this.callConnet();
    this.showMyComponent = true;
    //this.formTypeOf = 'redemption';
  }

  public onFormChangeEventParent(_event: any) {
    if (_event.status == "VALID") {
      this.formCheck = _event;

      //remove null from form object
      // let filteredDataForm = _event.value;
      let filteredDataForm = Object.fromEntries(Object.entries(_event.value).filter(([_, v]) => v !== null))
      console.log(filteredDataForm, 'after filter form data');

      //object mutation number to string
      for (const [key, value] of Object.entries(filteredDataForm)) {
        // console.log(key,value);
        if (typeof value == 'number') {
          console.log(key, '== number')
          filteredDataForm[key] = value.toString()
          // console.log( typeof value,'after the conversion')
        }
        else
          console.log('....string....')
      }

      console.log('number to string completed ✅', filteredDataForm);

      // function removeEmptySimpleObj(obj:any) { // layer-1
      //   return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null ));
      // }
      // remove empty nested level
      // function removeEmpty(obj:any):any{
      //   return Object.fromEntries(
      //     Object.entries(obj)
      //       .filter(([_, v]) => v != (null|| ""))
      //       .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
      //   );
      // }

      this.finalFormData = {
        call_type: this.formTypeOf,
        Indata: filteredDataForm,
        Lead_Type: {
          leadId: this.nowLead.leadId!.toString(), //this.decryptLeadID,
          leadType: this.nowLead.leadType!.toString(),
          empCode: this.empCode.toString(),
          currMobNo: this.nowLead.mobNo!.toString()
        }
      }

      console.log("submitted data form format 💚💛💙", this.finalFormData);

      this.apiService.submitFormDta(this.finalFormData).subscribe(result => {
        console.log(result), 'submit response formdata..........';

        alert('calling next leaad . . . . . . . . submit success-------✅')
        // this.apiService.fetchLead(this.empCode)
        this.apiService.fetchLead(this.empCode);
      }, error => {

      });
    }

  }

  public closeFormParent() {
    console.log('close form  parent');

    this.showMyComponent = false;
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

}
