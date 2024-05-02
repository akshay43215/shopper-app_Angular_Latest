import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../common/layout/navbar/navbar.component';

@Component({
  selector: 'app-no-data',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.css'
})
export class NoDataComponent {
  constructor(public localstorage:LocalstorageService,public toastr:ToastrService,public router:Router){}
 ngOnInit()
  {
    // console.log(this.showSidebar+' ---parent app init');

    if(this.localstorage.getUserdata("code")=="200")
    {
      if(this.localstorage.getUserdata("roleid")!="user")
      {
        this.toastr.warning('Your not authorized','Message');
        this.router.navigate(['login']);
      }
      else
      {
        //On load contents here
      }
    }
    else
    {
      this.toastr.warning('Session expired','Message');
      this.router.navigate(['no-data']);
    }
  }
}
