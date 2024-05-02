import { Component, OnInit } from '@angular/core';
import { CustomerTodayMetaComponent } from '../_template-meta/customer-today-meta/customer-today-meta.component';
import { CustomerRedemptionMetaComponent } from '../_template-meta/customer-redemption-meta/customer-redemption-meta.component';
import { CustomerNcaMetaComponent } from '../_template-meta/customer-nca-meta/customer-nca-meta.component';
import { CommonModule } from '@angular/common';
import { apiService } from '../../services/shared/apiService.Service';
import { leadInterfaceType } from '../../interface/leadInterface';

export type metaOnOfType = 'nca' | 'today' | 'redemption';


@Component({
  selector: 'app-customer-meta',
  standalone: true,
  imports: [CommonModule, CustomerTodayMetaComponent,CustomerRedemptionMetaComponent,CustomerNcaMetaComponent],
  templateUrl: './customer-meta.component.html',
  styleUrl: './customer-meta.component.css'
})
export class CustomerMetaComponent implements OnInit{
  metaOnOf !: metaOnOfType;
  public nowLead !: leadInterfaceType

  constructor(  public apiService: apiService) { }

  ngOnInit(): void {
    // this.metaOnOf='today'
      // console.log(this.localstorage.getvalue('hiddenVals'));
      // this.obj=this.localstorage.getvalue('hiddenVals');
      this.apiService.apiData$.subscribe(
        (data) => {
          if (data.leadType) {

            this.nowLead = data
            // console.log('child cust-meta page observable ⭕', this.nowLead);
            // console.log(this.nowLead.customerType,'= custumer type');
            let {leadType} = data //.trim().toLowerCase
            if (leadType.toLowerCase().trim() == "redemption") {
              this.metaOnOf = 'redemption'
            } else if (leadType.toLowerCase().trim() == 'new customer') {
              this.metaOnOf='today'
            }else {
              this.metaOnOf = 'nca'
            }

            console.log(leadType,'as of assigined',leadType);
          }

        })

  }

  get showNCAMeta() {
    return this.metaOnOf === 'nca';
  }
  get showTodayMeta() {
    return this.metaOnOf === 'today';
  }
  get showRedemptionMeta () {
    return this.metaOnOf === 'redemption'
  }


  // switchMeta(type:metaOnOfType) {
  //   console.log(this.metaOnOf,'before');

  //   this.metaOnOf = type;
  //   console.log(this.metaOnOf,'after');
  // }
}
