import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRedemptionMetaComponent } from './customer-redemption-meta.component';

describe('CustomerRedemptionMetaComponent', () => {
  let component: CustomerRedemptionMetaComponent;
  let fixture: ComponentFixture<CustomerRedemptionMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRedemptionMetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRedemptionMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
