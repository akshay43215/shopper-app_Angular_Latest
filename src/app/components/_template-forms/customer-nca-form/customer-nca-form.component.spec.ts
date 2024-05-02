import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNCAFormComponent } from './customer-nca-form.component';

describe('CustomerNCAFormComponent', () => {
  let component: CustomerNCAFormComponent;
  let fixture: ComponentFixture<CustomerNCAFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerNCAFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerNCAFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
