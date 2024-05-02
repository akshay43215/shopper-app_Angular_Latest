import { AfterContentChecked, ChangeDetectorRef, Component,CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import {ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { CommonModule, ɵparseCookieValue } from '@angular/common';
import { SidebarComponent } from '../../common/layout/sidebar/sidebar.component';
import { NavbarComponent } from '../../common/layout/navbar/navbar.component';
import { ShowLeadComponent } from '../../pages/show-lead/show-lead.component';
import { RouterOutlet } from '@angular/router';
import { apiService } from '../../services/shared/apiService.Service';
import { EncryptService } from '../../services/encrypt/encrypt.service';

// import {handleClick} from '../../Dialer/caller.ts' ;
// import * as aaa from '../../../Dialer/caller';

// declare function handleClick():any;

@Component({
  selector: 'app-home',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SidebarComponent,NavbarComponent,ShowLeadComponent, CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnChanges, AfterContentChecked {
  // @Input() showSidebar:boolean=true;
  showSidebar:boolean=true;
  isLoading:boolean=true;
  empCode : number
  nowLead: any
  // decryptBucketID : number

  // obj !: {leadID:Number, leadType:string, ph:Number}


 constructor(public localstorage:LocalstorageService, public apiService:apiService, public toastr:ToastrService,public router:Router, public encrypt: EncryptService, private cdRef : ChangeDetectorRef){
   this.empCode = JSON.parse(this.localstorage.getUserdata('empcode')); // first get hidden empcode

  //  this.decryptBucketID = JSON.parse(this.encrypt.get(JSON.parse(this.localstorage.getvalue('hidden')).bucketId));

   //  console.log('trigered homepage contructor');

    //  this.apiService.fetchLead(this.empCode).subscribe((response)=> {
    //    console.log(response,'resp home page top parent'); //success
    //    this.nowLead = response;
    //   })
    console.log('-------------------------------------------------------------------------------------home constructor');
  // console.log(aaa.handleClick);

  }

  ngOnInit()
  {
    console.log('-------------------------------------------------------------------------------------home init');
    if(this.localstorage.getUserdata("code")=="200")
    {
      if(this.localstorage.getUserdata("roleid")!="user")
      {
        this.toastr.warning('Your not authorized','Message');
        this.router.navigate(['login']);
      }
      else
      {
        // console.log('calling in the most parent fetch data');
        console.log('magic goes here top parent call...💛....................................!!!');
        this.apiService.getSideMenu();
        this.apiService.fetchLead(this.empCode);

      }
    }
    else
    {
      this.toastr.warning('Session expired','Message');
      this.router.navigate(['login']);
    }

    //On load contents here
    this.apiService.isLoading$.subscribe((loading:boolean)=>{
      this.isLoading =loading
      console.log(loading,'loading bool val subscribe');

    })
  }



  ngOnChanges(){
    console.log(' ---parent home change can do check login expire💨💨💨');
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges()
  }


}
