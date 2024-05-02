import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRedemptionFormComponent } from './customer-redemption-form.component';

describe('CustomerRedemptionFormComponent', () => {
  let component: CustomerRedemptionFormComponent;
  let fixture: ComponentFixture<CustomerRedemptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRedemptionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRedemptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
