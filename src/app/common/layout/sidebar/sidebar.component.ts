import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { apiService } from '../../../services/shared/apiService.Service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { leadInterfaceType } from '../../../interface/leadInterface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit,OnChanges{
    public sidebarList !: [{cateId:number, cateName:string}]
    public empCode: string
    nowLead !: leadInterfaceType

  constructor(public apiService:apiService, public localstorage : LocalstorageService) {
    this.empCode = this.localstorage.getUserdata('empcode');

    // apiService.getSideMenu().subscribe((response:any)=>{
    //   if (response.status == 200) {

    //     this.sidebarList = response.campaignList;
    //     console.log(this.sidebarList,'sidebar data');
    //   }

    // },
    //   (err:Error)=> {
    //   throw err
    // })
    this.apiService.sidebarData$.subscribe((response) => {
      debugger
      if (response) {

            this.sidebarList = response.campaignList;
            console.log(this.sidebarList,'sidebar data');
          }
    })
   }
  @Input() showSidebar!:boolean;

  ngOnInit(): void {
    this.apiService.apiData$.subscribe((data: leadInterfaceType) => {
      // debugger

      this.nowLead = data
    })
  //  console.log(this.showSidebar+' ,,,,,,,,,,sidebar init');
  }
  ngOnChanges(): void {
  //  console.log(this.showSidebar+' ,,,,,,,,,,sidebar change');

  }

}
