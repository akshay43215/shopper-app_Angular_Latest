import { Component, Input, SimpleChanges } from '@angular/core';
import { apiService } from '../../../services/shared/apiService.Service';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { leadInterfaceType } from '../../../interface/leadInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-today-meta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-today-meta.component.html',
  styleUrl: './customer-today-meta.component.css'
})
export class CustomerTodayMetaComponent {
  @Input() nowLeadProp!: leadInterfaceType
  constructor(public apiService:apiService, public localstorage:LocalstorageService) {
  //   console.log(this.apiService.leadFirst,'-------')
  }

  ngOnInit(): void {
    // console.log('Customer tody meta init',this.nowLeadProp);

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Customer tody meta changes',this.nowLeadProp);

  }

}
