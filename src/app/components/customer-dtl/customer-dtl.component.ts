import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CustomerHeaderomponent } from '../customer-header/customer-header.component';
import { CustomerMetaComponent } from '../customer-meta/customer-meta.component';
import { CustomerPledgesComponent } from '../customer-pledges/customer-pledges.component';
import { apiService } from '../../services/shared/apiService.Service';
import { leadInterfaceType } from '../../interface/leadInterface';

export type formTypes = 'nca' | 'today' | 'redemption';
@Component({
  selector: 'app-customer-dtl',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CustomerHeaderomponent,CustomerMetaComponent,CustomerPledgesComponent],
  templateUrl: './customer-dtl.component.html',
  styleUrl: './customer-dtl.component.css'
})

export class CustomerDtlComponent implements OnInit{
  nowLead !: leadInterfaceType
  formTypeOf !: formTypes
  constructor(public apiService: apiService) {}

  ngOnInit(): void {
    // this.apiService.apiData$.subscribe((data)=> {
    //   console.log(data,'!!---on dtl----!!');
    //   this.nowLead = data;
    //   let {leadName} = data
    //   console.log(leadName,'as destructure lead name ....');
    //   debugger;
    //   if (leadName == "redemption") {
    //     this.formTypeOf = 'redemption'
    //   } else if (leadName == "nca"){w
    //     this.formTypeOf = 'nca'
    //   }else {
    //     this.formTypeOf ='today'
    //   }
    // })
  }
}
