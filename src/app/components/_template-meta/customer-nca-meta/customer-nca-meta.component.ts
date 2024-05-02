import { Component, Input, SimpleChanges } from '@angular/core';
import { leadInterfaceType } from '../../../interface/leadInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-nca-meta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-nca-meta.component.html',
  styleUrl: './customer-nca-meta.component.css'
})
export class CustomerNcaMetaComponent {
  @Input() nowLeadProp!: leadInterfaceType

  ngOnInit(): void {
    // console.log('Customer Redemption Meta init',this.nowLeadProp);

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Customer Redemption Meta changes',this.nowLeadProp);

  }

}
