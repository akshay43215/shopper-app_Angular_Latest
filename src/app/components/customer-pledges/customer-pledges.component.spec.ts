import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPledgesComponent } from './customer-pledges.component';

describe('CustomerPledgesComponent', () => {
  let component: CustomerPledgesComponent;
  let fixture: ComponentFixture<CustomerPledgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPledgesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerPledgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
