import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDtlComponent } from './customer-dtl.component';

describe('CustomerDtlComponent', () => {
  let component: CustomerDtlComponent;
  let fixture: ComponentFixture<CustomerDtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDtlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
