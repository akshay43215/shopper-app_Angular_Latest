import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { apiService } from '../../../services/shared/apiService.Service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-nca-form',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './customer-nca-form.component.html',
  styleUrl: './customer-nca-form.component.css'
})
export class CustomerNCAFormComponent implements OnInit,OnDestroy {
  @Output() private onFormChange = new EventEmitter<any>();
  @Output() private closeForm = new EventEmitter<any>();

  public callNCAForm!: FormGroup;
  public submitted: boolean = false;
  callResponseList! :{ resid: string|number; resname: string } []


  public showAnswerDrops: boolean  // attended nested drpdowns
  public showNPSRemark: boolean  // attended nested nps remark <8
  public starValid !: boolean;


  constructor( private fb: FormBuilder, public localstorage:LocalstorageService, public apiService:apiService ) {
    this.showAnswerDrops = false;
    this.showNPSRemark = false;
  }

  ngOnInit(): void {
    this.callNCAForm = this.fb.group({
      callRespFC: [null, Validators.required],
      leadStaisFC: [null],
      TranTimeFC  : [null],
      NpScoreFC  : [null],
      ncaRemarkFC  : [null],
      leadRemarkFC :[null],
      starRatingFC : [null],
      clearCheckFC: [false]
    });
    console.log('init',this.starValid);

    this.getLoadData();

    this.callNCAForm.controls['callRespFC'].valueChanges.subscribe((changeResp) => {
      // console.log(this.callNCAForm.controls);

      if(changeResp == '1') {
        this.showAnswerDrops = true
        this.starValid= false;
        this.callNCAForm.controls['leadStaisFC'].setValidators([Validators.required])
        this.callNCAForm.controls['TranTimeFC'].setValidators([Validators.required])
        this.callNCAForm.controls['NpScoreFC'].setValidators([Validators.required])
        this.callNCAForm.controls['clearCheckFC'].setValidators([Validators.requiredTrue])
      } else {
        this.starValid= true;
        this.showAnswerDrops = false;
        this.callNCAForm.controls['leadStaisFC'].clearValidators()
        this.callNCAForm.controls['TranTimeFC'].clearValidators()
        this.callNCAForm.controls['NpScoreFC'].clearValidators()
        this.callNCAForm.controls['clearCheckFC'].clearValidators()
        // this.callNCAForm.controls[''].clearValidators()
      }
    });

    this.callNCAForm.controls['NpScoreFC'].valueChanges.subscribe((changeNPS)=> {

      // console.log(this.callNCAForm.controls);

      if (changeNPS<7) {
        this.showNPSRemark = true;
        this.callNCAForm.controls['ncaRemarkFC'].setValidators([Validators.required])

      } else {
        this.showNPSRemark = false;
        this.callNCAForm.controls['ncaRemarkFC'].clearValidators();
      }
    })



  }


   // getter
   get f() {
    return this.callNCAForm.controls;
    // console.log(this.callNCAForm.controls);
  }

  private getLoadData() {

    console.log(this.localstorage.getUserdata('empcode'),'= user code storage')
    // setTimeout(() => {
    //   this.apiService.getLead('373706').subscribe(response=> {
    //     console.log(Object.keys(response));
    //     console.log(response);
    //   })
    // }, 12000);

    this.apiService.dropdownData$.subscribe((data:any)=> {
      if (data) {
        this.callResponseList = data.callResponseList;
      }
    })
    // getDropdown().subscribe(resp=>{
    //   if(resp.status=="200")
    //     {
    //       this.callResponseList = resp.callResponseList;
    //     }
    // },error=>{
    //   console.log(error);

    // });

  }

  handleCheckStar(e:any){

    // const starController:FormControl  = this.callNCAForm.get('starRatingFC') as FormControl ;
    const starController:FormControl  = this.callNCAForm.controls['starRatingFC'] as FormControl ;

    // const starController = this.f['starRatingFC'].value
    // starController.clearValidators();
    this.starValid = true
    starController.setValue(e.target.value);
    console.log(e.target);
    console.log(e.target.value,'---',starController.value)
  }

  closeModal() {
    // this.starValid= false;
    this.callNCAForm.reset();
    this.closeForm.emit();
  }


  // form submit
  handleSubmit() {
    this.submitted = true;
    if (this.callNCAForm.valid) {
      console.log(this.callNCAForm.value);
      //alert('form submitted ✅');
      this.onFormChange.emit(this.callNCAForm)

    } else {
      alert('form sub err invalid ⭕');
      // console.warn(this.callNCAForm.value);
      console.table(this.callNCAForm.value);
    }
    // this.callNCAForm.reset();
  }

  ngOnDestroy(): void {
    this.callNCAForm.reset();
    console.log('reset form nca on destroy');

  }

}
