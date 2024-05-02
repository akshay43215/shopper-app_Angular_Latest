import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { EncryptService } from '../../services/encrypt/encrypt.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

declare function validatePhoneNumber(name:any):any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(public loginservice:LoginService,public encrypt:EncryptService,public router:Router,public toastr:ToastrService,public localstorage:LocalstorageService){}
  hide:boolean=false;
  empcode!: string;
  password!:string;
  btntxt:boolean=true;
  load:number=2;
  ngOnInit()
  {
    debugger
     localStorage.clear();
    //  alert(validatePhoneNumber(1233453))
  }
  public show()
  {
    this.hide=!this.hide;
  }
  public employeeLogin()
  {
    debugger;
    if(this.empcode==null ||this.empcode==undefined)
    {
      this.toastr.warning('Enter your employee code','Message');
    }
    else if(this.password==null || this.password=="undefined"||this.password=="")
    {
      this.toastr.warning('Enter your pasword','Message');
    }
    else
    {
      this.btntxt=false;
      var password=this.encrypt.set(this.password);
      //console.log("password",password);
      const data={empcode:this.empcode,password:password};
      this.loginservice.login(data).subscribe(result=>{

        //console.log(result);
        if(result.status=="200")
        {
          if(this.encrypt.get(result.employeedtls.code)=="200")
          {
            if(this.encrypt.get(result.employeedtls.roleid)=="user")
            {
              this.localstorage.setvalue("userdata",JSON.stringify(result.employeedtls));
              this.router.navigate(['home']);
              this.toastr.success(result.message,'Message');
            }
            else
            {
              this.empcode="";
              this.password="";
              this.toastr.info('Development inprogress..','Message');
            }

          }
          else
          {
            this.empcode="";
            this.password="";
            this.toastr.warning('Access Denied','Message');
          }
          this.btntxt=true;
        }
        else
        {
          this.empcode="";
          this.password="";
          this.toastr.warning(result.message,'Message');
          this.btntxt=true;
        }
      },
      error=>{
        console.log(error);
      });
    }
  }
  numberOnly(event: { which: any; keyCode: any; }): boolean
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
      return false;
    }
    return true;
  }
}
