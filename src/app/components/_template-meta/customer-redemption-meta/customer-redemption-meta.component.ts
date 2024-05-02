import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { leadInterfaceType } from '../../../interface/leadInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-redemption-meta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-redemption-meta.component.html',
  styleUrl: './customer-redemption-meta.component.css'
})
export class CustomerRedemptionMetaComponent implements OnInit, OnChanges {
  @Input() nowLeadProp!: leadInterfaceType

  ngOnInit(): void {
    // console.log('Customer Redemption Meta init',this.nowLeadProp);

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Customer Redemption Meta changes',this.nowLeadProp);

  }

}
