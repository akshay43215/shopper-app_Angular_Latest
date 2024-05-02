import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

// import { ModalService } from '../../../services/modal.service';

@Component({
    selector: 'app-modal-popup',
    templateUrl: 'modal-popup.component.html',
    styleUrls: ['modal-popup.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor() {}
  @Input() title: string = '';
  @Input() body: string = '';

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  ngOnInit(): void {
    console.log('Modal popup init');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  confirm() {
    this.confirmEvent.emit();
  }
  ngOnDestroy(): void {
    console.log(' Modal popup destroyed');
    this.closeMeEvent.emit();
  }

}
