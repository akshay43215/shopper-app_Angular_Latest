import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { apiService } from '../../../services/shared/apiService.Service';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-customer-today-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-today-form.component.html',
  styleUrl: './customer-today-form.component.css'
})
export class CustomerTodayFormComponent implements OnInit, DoCheck, OnChanges, AfterViewChecked {
  @Output() private onFormChange = new EventEmitter<any>();
  @Output() private closeForm = new EventEmitter<any>();
  public callTodayForm!: FormGroup;
  public submitted: boolean = false;
  public showResponseRmk!: boolean
  public showAnswerDrops!: boolean  // attended nested drpdowns
  public showInterestDrops!: boolean  // interested drpdowns
  public showCallBackDt !: boolean;


  callResponseList!: { resid: string ; resname: string }[]
  followupstatusList!: { followupid: string; followupReason: string }[]
  productList!: { prdid: string, product: string }[]
  pesldtlList!: { pdi: string, pdtl: string }[]
  branchdtl!: { brid: string, brname: string }[]
  public starValid !: boolean;
  public startDate: Date = new Date()//= new Date (Date.now());



  constructor(
    private fb: FormBuilder,
    public localstorage: LocalstorageService,
    public apiService: apiService,
    private cdref: ChangeDetectorRef) {
    // this.startDate = new Date();
    this.getLoadData();
  }


  //-------------------------------------------------------------------------
  ngOnInit(): void {

    console.log(this.startDate);

    this.callTodayForm = this.fb.group({
      callRespFC: [null, Validators.required],
      folowUpStatusFC: [null],
      productInterestFC: [null],
      leadOccupationFC: [null],
      leadEmailFC: [null],
      leadNewPhoneFC: [null],
      leadBranchFC: [null],
      leadRemarkFC: [null],
      followupDateFC: [this.startDate],//[formatDate(this.startDate, 'yyyy-MM-dd', 'en')],  //'yyyy-MM-dd'
      followupHourFC: [null],
      starRatingFC: [null],
      clearCheckFC: [false]
    });

    this.callTodayForm.controls['callRespFC'].valueChanges.subscribe((changeResp) => {

      this.showResponseRmk = true;
      this.callTodayForm.controls['clearCheckFC'].setValidators([Validators.requiredTrue]);
      //if(this.callTodayForm.controls['callRespFC'].value == '1'){
      if (changeResp == '1') {
        this.starValid = false;
        this.showAnswerDrops = true;
        this.callTodayForm.controls['folowUpStatusFC'].setValidators([Validators.required]);
        this.callTodayForm.controls['productInterestFC'].setValidators([Validators.required]);
        this.callTodayForm.controls['leadOccupationFC'].setValidators([Validators.required]);
        this.callTodayForm.controls['leadRemarkFC'].setValidators([Validators.required]);
      } else {
        this.starValid = true;
        this.showAnswerDrops = false;
        this.showInterestDrops = false;
        this.callTodayForm.controls['folowUpStatusFC'].clearValidators()
        this.callTodayForm.controls['productInterestFC'].clearValidators()
        this.callTodayForm.controls['leadOccupationFC'].clearValidators()
        this.callTodayForm.controls['leadBranchFC'].clearValidators()
        // this.callTodayForm.controls['leadRemarkFC'].clearValidators()
        this.callTodayForm.updateValueAndValidity();
      }
    })

    this.callTodayForm.controls['folowUpStatusFC'].valueChanges.subscribe((changeFlwp) => {

        //interested
        if (changeFlwp == '1') {
          this.showInterestDrops = true;
          this.showInterestDrops = true;
          this.callTodayForm.controls['leadEmailFC'].setValidators([Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
          this.callTodayForm.controls['leadNewPhoneFC'].setValidators([Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
          this.callTodayForm.controls['leadBranchFC'].setValidators([Validators.required]);
        } else if (changeFlwp == '3') {
          this.showCallBackDt = true;
          this.callTodayForm.controls['followupDateFC'].setValidators([Validators.required]);
          this.callTodayForm.controls['followupHourFC'].setValidators([Validators.required]);
          this.callTodayForm.updateValueAndValidity()
        } else{
          //not interest
          this.showInterestDrops = false;
          this.callTodayForm.controls['leadEmailFC'].clearValidators();
          this.callTodayForm.controls['leadNewPhoneFC'].clearValidators();
          this.callTodayForm.controls['leadBranchFC'].clearValidators();
          this.callTodayForm.updateValueAndValidity()
          console.log('else', this.callTodayForm.controls['leadBranchFC']);
          //non-callback
          this.showCallBackDt = false;
          this.callTodayForm.controls['followupDateFC'].clearValidators();
          this.callTodayForm.controls['followupHourFC'].clearValidators();
          this.callTodayForm.controls['leadBranchFC'].clearValidators();
          this.callTodayForm.updateValueAndValidity()
        }
      // } else if (changeFlwp == '3') {
        //callback
        // else {
        //   this.showCallBackDt = false;
        //   this.callTodayForm.controls['followupDateFC'].clearValidators();
        //   this.callTodayForm.controls['followupHourFC'].clearValidators();
        // }
      // }
    })
  }

  ngDoCheck(): void {

    // console.log('ng do check');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'ngOnChanges');

  }

  ngAfterViewChecked(): void {
    // console.log('triger ngAfterViewChecked ');

    this.cdref.detectChanges()
  }

  // getter
  get f() {
    return this.callTodayForm.controls;
  }


  //-------------------------------------------------------------------------
  private getLoadData() {
    // console.log(this.localstorage.getUserdata('empcode'),'= user code stored')
    this.apiService.dropdownData$.subscribe((data:any)=> {
      if (data) {
        this.callResponseList = data.callResponseList;
            this.followupstatusList = data.followupstatusList;
            this.productList = data.productList;
            this.pesldtlList = data.pesldtlList;
            this.branchdtl = data.branchdtl;
      }
    })
    // getDropdown().subscribe(resp => {

    //   console.log(resp);

    //   if (resp.status == "200") {
    //     this.callResponseList = resp.callResponseList;
    //     this.followupstatusList = resp.followupstatusList;
    //     this.productList = resp.productList;
    //     this.pesldtlList = resp.pesldtlList;
    //     this.branchdtl = resp.branchdtl;
    //   }
    // }, error => {
    //   console.log(error);
    // });
  }


  //-------------------------------------------------------------------------
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //-------------------------------------------------------------------------
  handleCheckStar(e: any) {

    // const starController:FormControl  = this.callTodayForm.get('starRatingFC') as FormControl ;
    const starController: FormControl = this.callTodayForm.controls['starRatingFC'] as FormControl;
    // const starController = this.f['starRatingFC'];
    this.starValid = true
    starController.setValue(e.target.value);
    // console.log(e.target);
    console.log(e.target.value, '---', starController.value)
  }


  //-------------------------------------------------------------------------
  closeModal() {

    this.callTodayForm.reset();
    this.closeForm.emit()
    // this.showMyComponent = false;
  }


  //-------------------------------------------------------------------------
  handleSubmit() {

    this.submitted = true;
    console.log(this.callTodayForm.valid, 'isvalid child');

    if (this.callTodayForm.valid) {
      console.table(this.callTodayForm.value);
      // alert('form submitted ✅');
      this.onFormChange.emit(this.callTodayForm)

      // console.log(this.callTodayForm.value);
    } else {
      alert('form sub err invalid ⭕');
      // console.warn(this.callTodayForm.value);
      console.table(this.callTodayForm.value);
    }
    // this.callTodayForm.reset();
  }


  //-------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.callTodayForm.reset();
    console.log('ngOnDestroyed');

  }

}
