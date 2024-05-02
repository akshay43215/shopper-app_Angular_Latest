import { CommonModule,DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription, map, share, timer } from 'rxjs';
import { LocalstorageService } from '../../../services/localstorage/localstorage.service';
import { ModalService } from '../../../services/shared/modalpopup/modal.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,OnChanges {
  today: number = Date.now();
  rxTime = new Date();
  intervalId: any;
  subscription!: Subscription;
  liveUser!:String ;

  constructor(private datePipe:DatePipe, public localstorage:LocalstorageService, private modalService: ModalService, public toastr:ToastrService){
    this.liveUser = this.localstorage.getUserdata("name")
  }

  @Input() showSidebar!:boolean;
  @Output() showSidebarChange = new EventEmitter<boolean>();

  ngOnInit() {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        let hour = this.rxTime.getHours();
        let minuts = this.rxTime.getMinutes();
        let seconds = this.rxTime.getSeconds();
        let NewTime = hour + ":" + minuts + ":" + seconds
        this.rxTime = time;
      });
      // console.log(this.localstorage.getUserdata('name'))
      // console.log(this.localstorage.getUserdata('empcode'))
      // console.log(this.localstorage.getUserdata('branchid'))
      // console.log(this.localstorage.getUserdata('roleid'))
      // console.log(this.localstorage.getUserdata('code'))
    }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.showSidebar +' .........nav change');
  }

  toggleSidebar(){
    this.showSidebar = !this.showSidebar;
    // console.log(this.showSidebar +' change click navbar');
    this.showSidebarChange.emit(this.showSidebar)
  }

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  showMyComponent: boolean = false

  handleBreakTime(){
    this.modalService.openModal(this.entry,'Is this break time','Do you want some break Now ..!!!')
    .subscribe((resp)=> {
      // this.localstorage.
    })
  }



  handleLogout() {
    this.sub = this.modalService
      .openModal(this.entry, 'Are you sure ?', 'Do You Want to Logout..!')
      .subscribe((v) => {
      //your logic
      this.localstorage.removeUser();
      this.toastr.info('Log-out succcessfully..','Message');
    });
  }

}
