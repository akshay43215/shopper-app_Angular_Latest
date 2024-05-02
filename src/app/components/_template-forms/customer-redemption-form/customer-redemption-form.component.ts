import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChildren, input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { apiService } from '../../../services/shared/apiService.Service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-customer-redemption-form',
  standalone: true,
  imports: [CommonModule,FormsModule , ReactiveFormsModule],
  templateUrl: './customer-redemption-form.component.html',
  styleUrl: './customer-redemption-form.component.css'
})


export class CustomerRedemptionFormComponent implements OnInit,OnChanges,OnDestroy {
  @Output() private onFormChange = new EventEmitter<any>();
  @Output() private closeForm = new EventEmitter<any>();





  public callRedemptionForm!: FormGroup;
  public submitted: boolean = false;
  public starValid!: boolean ;
  callResponseList! :{ resid: string|number; resname: string }[];
  releaseRespList ! : {releaseid: number; releasename:string}[];


  public showAnswerDrops: boolean = false;  // attended nested drpdowns
  public showComeBackrDrops: boolean;  // comeback radio nested drpdowns
  public showCallBackDt : boolean;
  public startDate:Date;

  constructor( private fb: FormBuilder, public localstorage:LocalstorageService, public apiService:apiService) {
    this.startDate = new Date (Date.now());
    // type DropKeysResp = {callResponseList: string, followupstatusList: string , productList: string​, pesldtlList: string, branchdtl: string, releaseList: string, status: string, message:string};
    this.showComeBackrDrops = false;
    this.showCallBackDt = false;

    this.callRedemptionForm = this.fb.group({
      callRespFC: [null, Validators.required],

      leadReasonFC: [null],
      leadRatingFC: [null],
      transactTimeFC  : [null],

      leadComeBackFC: ['0'],
      leadPledgeWtFC: [null],
      leadPledgeAmntFC: [null],

      leadRemarkFC :[null],
      BranchRemarkFC  : [null],

      followupDateFC : [formatDate(new Date (Date.now()),'yyyy-MM-dd', 'en')],  //'yyyy-MM-dd'
      followupHourFC : [null],
      starRatingFC : [null],
      clearCheckFC: [false]
    });

  }

  //-------------------------------------------------------------------------
  ngOnInit(): void {

    this.getLoadData();

    this.callRedemptionForm.controls['callRespFC'].valueChanges.subscribe((changeResp) => {

      if (changeResp == '1' || changeResp == '9') {
        this.starValid = false;
        this.callRedemptionForm.controls['clearCheckFC'].setValidators([Validators.requiredTrue])

        if (this.callRedemptionForm.controls['callRespFC'].value == '1') {
          this.showAnswerDrops = true;
          this.callRedemptionForm.controls['leadReasonFC'].setValidators([Validators.required])
          this.callRedemptionForm.controls['leadRatingFC'].setValidators([Validators.required])
          this.callRedemptionForm.controls['transactTimeFC'].setValidators([Validators.required])
          this.callRedemptionForm.controls['leadRemarkFC'].setValidators([Validators.required])
        } else {
          this.showAnswerDrops = false;
          this.callRedemptionForm.controls['leadReasonFC'].clearValidators()
          this.callRedemptionForm.controls['leadRatingFC'].clearValidators()
          this.callRedemptionForm.controls['transactTimeFC'].clearValidators()
          this.callRedemptionForm.controls['leadRemarkFC'].clearValidators()
        }
        if (this.callRedemptionForm.controls['callRespFC'].value == '9') {
          this.showCallBackDt = true;
          this.callRedemptionForm.controls['followupDateFC'].setValidators([Validators.required]); //Date()
          this.callRedemptionForm.controls['followupHourFC'].setValidators([Validators.required]);
        } else {
          this.showCallBackDt = false;
          // this.showAnswerDrops = false;
          this.callRedemptionForm.controls['followupDateFC'].clearValidators()
          this.callRedemptionForm.controls['followupHourFC'].clearValidators()
          console.log(this.callRedemptionForm.controls);
        }
      } else {
        this.starValid = true
        this.showAnswerDrops = false;
        this.showCallBackDt = false;
        this.callRedemptionForm.controls['clearCheckFC'].clearValidators()
        this.callRedemptionForm.controls['starRatingFC'].clearValidators()
      }
    });

    this.callRedemptionForm.controls['leadComeBackFC'].valueChanges.subscribe((changeComeBack)=>{

      if (changeComeBack =="0") {
         this.showComeBackrDrops = false
         this.callRedemptionForm.controls['leadPledgeWtFC'].clearValidators();
         this.callRedemptionForm.controls['leadPledgeAmntFC'].clearValidators();
      }
      else if (changeComeBack =="1") {
        this.callRedemptionForm.controls['leadPledgeWtFC'].setValidators([Validators.required]);
        this.callRedemptionForm.controls['leadPledgeAmntFC'].setValidators([Validators.required]);
         this.showComeBackrDrops = true;
      }
    })

  }


  //-------------------------------------------------------------------------
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change on change');

  }



   // getter
   get f() {
    return this.callRedemptionForm.controls;
  }


  //-------------------------------------------------------------------------
  private getLoadData() {
    // console.log(this.localstorage.getUserdata('empcode'),'= user code storage')
    this.apiService.dropdownData$.subscribe((data:any)=> {
      if (data) {
        this.callResponseList = data.callResponseList;
        this.releaseRespList = data.releaseList;
      }
    })
    // getDropdown().subscribe((resp)=>{
    //   if(resp.status=="200")
    //     {
    //       this.callResponseList = resp.callResponseList;
    //       this.releaseRespList = resp.releaseList
    //     }
    // },error=>{
    //   console.log(error);
    // });
  }

  //-------------------------------------------------------------------------
  handleCheckStar(e:any){

    const starController:FormControl  = this.callRedemptionForm.controls['starRatingFC'] as FormControl ;
    // const starController = this.f['starRatingFC'].value
    // starController.clearValidators();
    this.starValid = true
    starController.setValue(e.target.value);
    // this.callRedemptionForm.controls['starRatingFC'].setValue(e.target.value)
    // console.log(e.target);
    // console.log(e.target.value,'---',this.callRedemptionForm.controls['starRatingFC'].value)
  }

  //-------------------------------------------------------------------------
  closeModal() {
     this.callRedemptionForm.reset();
    this.closeForm.emit()//close trigger o/p
  }


  //-------------------------------------------------------------------------
  handleSubmit() {

    this.submitted = true;
    if (this.callRedemptionForm.valid) {
      console.log(this.callRedemptionForm.value);

      alert('form submitted ✅');
      if (this.callRedemptionForm.valid) {
        this.onFormChange.emit(this.callRedemptionForm)
      }
      console.log(this.callRedemptionForm.value);

    } else {
      alert('form sub err invalid ⭕');
      console.table(this.callRedemptionForm.value);
      this.callRedemptionForm.reset();
    }
  }

  //-------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.callRedemptionForm.reset();
  }
}
