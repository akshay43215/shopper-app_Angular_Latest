import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { CustomerDtlComponent } from '../../components/customer-dtl/customer-dtl.component';
import { CustomerPledgesComponent } from '../../components/customer-pledges/customer-pledges.component';
import { apiService } from '../../services/shared/apiService.Service';
import { leadInterfaceType } from '../../interface/leadInterface';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { EncryptService } from '../../services/encrypt/encrypt.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { bottom } from '@popperjs/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-show-lead',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CustomerDtlComponent, CustomerPledgesComponent, CommonModule],
  templateUrl: './show-lead.component.html',
  styleUrl: './show-lead.component.css'
})
export class ShowLeadComponent implements OnInit, OnChanges {

  // public loading$ !: Observable<boolean>;
  //  empCode:number;
  nowLead !: leadInterfaceType

  //  get _leadNowLead(){
  //   return this.nowLead
  //  }
  // isShowLoad: boolean;
  @Input() emp!: String
  pathparam1!: string;
  quryParamBktId: string = '';
  empCode : number;
  // dcptTOken : string;

  // private isTokenExpired(token: string) {
  //   const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  //   return expiry * 1000 > Date.now();
  // }

  constructor(private localStorage: LocalstorageService, public encrypt: EncryptService, private apiService: apiService, private activeRoute: ActivatedRoute, public router:Router) {


    console.log(activeRoute);
    this.empCode = JSON.parse(this.localStorage.getUserdata('empcode'));


    // this.apiService.getLead(this.empCode).subscribe((response)=> {
    //   console.log(response,'resp get lead'); //success
    //   this.nowLead = response;
    // })
    // console.log(this.apiService.getLoading,'== constructor valloading');

    // this.activeRoute.params.subscribe((newPathParams) => {
    //   console.log(newPathParams)
    // });
    // console.log('show-lead constructor call');
    // console.log(this.activeRoute.snapshot.paramMap.get('bucketId'))
    // this.quryParamBktId = this.activeRoute.snapshot.paramMap.get('bucketId');


    console.log('-------------------------------------------------------------------------------------show-lead constructor');


  }

  ngOnInit(): void {
    debugger;
    console.log('-------------------------------------------------------------------------------------show-lead init');
    this.activeRoute.queryParams.subscribe((newQueryParams) => {
      debugger
      // let token = JSON.parse(this.localStorage.getvalue('userdata'))['token'].toString();
      // console.log(token);
      // let token2 = JSON.parse(this.encrypt.get(JSON.parse(this.localStorage.getvalue('userdata'))['token'])); the encryption differe so not work this
        // const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        // console.log(expiry * 1000 > Date.now());


      console.log(newQueryParams);

      if ('bucket' in newQueryParams) {
        this.quryParamBktId = newQueryParams['bucket'];
        console.log('has buket id✔');
        console.log('calling new ');
        // alert('call next fetch lead');
        // this.apiService.fetchLead(this.empCode,this.quryParamBktId);
      } else
        console.log('no bucket-id');

    });

    // setTimeout(() => {
      // console.log('loading on service before',this.apiService.loading$);
      this.apiService.apiData$.subscribe((data: leadInterfaceType) => {
        debugger
        if(data){

          if (data.leadId == null) {
            this.router.navigate(['home/no-data']); // tremporary commented
          }

          this.nowLead = data

          this.apiService.getDropdown();
          // this.isShowLoad=false
          // this.loading$ = this.apiService.getLoading();
          // console.log(this.loading$);

          console.log('after asign child page observable 🈹', this.nowLead);
          if(this.nowLead.status==401){
            //handle token expire

          }


          let { leadId } = this.nowLead;
          if (leadId) {

            leadId = this.encrypt.set(leadId)
            // console.warn(leadId,'encrypted');
            // leadId = this.encrypt.get(leadId)
            // console.warn(leadId,'decrypted');

            this.localStorage.setvalue('hidden', JSON.stringify({ "leadId": leadId, 'bucketId': this.quryParamBktId }))

            //  let hdnObj = JSON.parse(this.localStorage.getvalue('hidden'))
            //   // {leadId} = hdnObj;
            // console.log(this.encrypt.get(hdnObj.leadId))

          }
        }
        //  else {
        //   this.router.navigate(['home/no-data'])

        // }
      })

    // }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes on show-lead triggered');

  }

}
